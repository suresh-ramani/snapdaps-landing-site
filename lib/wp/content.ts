import "server-only";
import sanitizeHtml from "sanitize-html";

export type TocItem = { id: string; text: string; level: 2 | 3 };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z0-9#]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

/**
 * Cleans WordPress HTML and prepares it for the article page:
 * - strips scripts, inline styles and unknown tags
 * - lazy-loads images
 * - gives every h2/h3 a stable id and returns a table of contents
 * - rewrites absolute links to the old WP domain to relative site links
 */
export function prepareContent(html: string): { html: string; toc: TocItem[] } {
  const wpOrigin = process.env.WP_URL?.replace(/\/$/, "");

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
        attribs: { ...attribs, loading: "lazy", decoding: "async" },
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

  return { html: clean, toc };
}
