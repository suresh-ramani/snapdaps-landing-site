import "server-only";
import sanitizeHtml from "sanitize-html";

export type TocItem = { id: string; text: string; level: 2 | 3 };
export type FaqItem = { q: string; a: string };

const textOf = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&#8217;|&rsquo;/g, "’")
    .replace(/&[a-z0-9#]+;/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Questions and answers from the post's FAQ, for FAQPage schema. Reads the Yoast SEO FAQ block
 * (`.schema-faq-section` → `.schema-faq-question` + `.schema-faq-answer`), which is how editors
 * add FAQs in WordPress. Headless sites don't get Yoast's own schema output, so we build it here.
 */
function extractFaq(html: string): FaqItem[] {
  const items: FaqItem[] = [];
  const section = /<div[^>]*class="[^"]*\bschema-faq-section\b[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
  for (const m of html.matchAll(section)) {
    const q = /<strong[^>]*class="[^"]*\bschema-faq-question\b[^"]*"[^>]*>([\s\S]*?)<\/strong>/.exec(m[1])?.[1];
    const a = /<p[^>]*class="[^"]*\bschema-faq-answer\b[^"]*"[^>]*>([\s\S]*?)<\/p>/.exec(m[1])?.[1];
    if (q && a && textOf(q) && textOf(a)) items.push({ q: textOf(q), a: textOf(a) });
  }
  return items;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z0-9#]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

/** next/image widths (defaults) used for images inside post content. */
const CONTENT_WIDTHS = [640, 828, 1080, 1200, 1920];
const optimizerUrl = (src: string, w: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;

/**
 * Images inside a post (served from /media/…, see lib/wp/client.ts) go through the Next image
 * optimizer like the featured image: AVIF/WebP, sized for the reading column, never full-size
 * originals. WordPress's own srcset (same files, unoptimized) is replaced. Other images pass through.
 */
function optimizedImage(attribs: Record<string, string>): Record<string, string> {
  const src = attribs.src ?? "";
  if (!src.startsWith("/media/")) return {};
  const natural = Number(attribs.width) || Infinity;
  const widths = CONTENT_WIDTHS.filter((w) => w <= natural * 2);
  const list = widths.length ? widths : [CONTENT_WIDTHS[0]];
  return {
    src: optimizerUrl(src, list.find((w) => w >= 1080) ?? list[list.length - 1]),
    srcset: list.map((w) => `${optimizerUrl(src, w)} ${w}w`).join(", "),
    sizes: "(min-width: 768px) 42rem, 100vw",
  };
}

/**
 * Cleans WordPress HTML and prepares it for the article page:
 * - strips scripts, inline styles and unknown tags
 * - lazy-loads images
 * - gives every h2/h3 a stable id and returns a table of contents
 * - rewrites absolute links to the old WP domain to relative site links
 * - returns the Yoast FAQ block's questions for FAQPage schema
 */
export function prepareContent(html: string): { html: string; toc: TocItem[]; faq: FaqItem[] } {
  const wpOrigin = process.env.WP_URL?.replace(/\/$/, "");
  const faq = extractFaq(html);

  let clean = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "figure",
      "figcaption",
      "iframe",
      "video",
      "source",
      "h1",
      "h2",
      "details",
      "summary",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["id", "class"],
      a: ["href", "name", "target", "rel"],
      img: ["src", "srcset", "sizes", "alt", "width", "height", "loading", "decoding"],
      iframe: ["src", "width", "height", "allow", "allowfullscreen", "title", "loading"],
      video: ["src", "controls", "poster", "width", "height", "muted", "playsinline"],
      source: ["src", "type"],
      code: ["class"],
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com", "www.loom.com"],
    transformTags: {
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, ...optimizedImage(attribs), loading: "lazy", decoding: "async" },
      }),
      iframe: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: "lazy" } }),
      a: (tagName, attribs) => {
        let href = attribs.href ?? "";
        if (wpOrigin && href.startsWith(wpOrigin) && !href.includes("/wp-content/")) {
          href = href.slice(wpOrigin.length) || "/";
          // WP posts live at /<slug>/ — map them under /blogs
          if (!href.startsWith("/blogs")) href = `/blogs${href}`;
        }
        const external = /^https?:\/\//.test(href);
        return {
          tagName,
          attribs: {
            ...attribs,
            href,
            ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
          },
        };
      },
    },
  });

  // Demote stray h1s — the page title is the only h1.
  clean = clean.replace(/<h1(\s[^>]*)?>/g, "<h2$1>").replace(/<\/h1>/g, "</h2>");

  const toc: TocItem[] = [];
  const used = new Set<string>();
  clean = clean.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g, (_m, lvl: string, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    const existing = /id="([^"]+)"/.exec(attrs)?.[1];
    let id = existing ?? (slugify(text) || `section-${toc.length + 1}`);
    while (!existing && used.has(id)) id = `${id}-${toc.length}`;
    used.add(id);
    toc.push({ id, text, level: Number(lvl) as 2 | 3 });
    const nextAttrs = existing ? attrs : `${attrs} id="${id}"`;
    return `<h${lvl}${nextAttrs}>${inner}</h${lvl}>`;
  });

  return { html: clean, toc, faq };
}
