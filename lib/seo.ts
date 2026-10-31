import type { Metadata } from "next";
import { coreFeatures, founders, site } from "@/content/site";
import { absoluteUrl, stripHtml, wpDate } from "@/lib/utils";
import { videoPoster, youtubeId, type VideoTestimonial } from "@/content/video-testimonials";
import type { WPAuthor, WPPost, WPSeo } from "@/lib/wp/types";

type BuildMetadataInput = {
  /** Gets " | Snapdaps" appended by the root layout's title template. */
  title?: string;
  /** Used exactly as written (no suffix). Use for meta titles from the content doc. */
  absoluteTitle?: string;
  description?: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

/**
 * Path of a cursor-paginated blog listing (`?after=` / `?before=`). Paginated pages get a
 * self-referencing canonical (not page one — they list different posts) plus noindex, follow:
 * crawlers still follow them to every post, but only page one competes in results.
 */
export function pagedPath(base: string, { after, before }: { after?: string; before?: string }) {
  if (after) return `${base}?after=${encodeURIComponent(after)}`;
  if (before) return `${base}?before=${encodeURIComponent(before)}`;
  return base;
}

/** One place that builds title, canonical, Open Graph and Twitter tags for every route. */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const description = input.description ?? site.description;
  const images = input.image ? [{ url: input.image, width: 1200, height: 630 }] : undefined;
  const shareTitle = input.absoluteTitle ?? (input.title ? `${input.title} | ${site.name}` : site.name);

  return {
    title: input.absoluteTitle ? { absolute: input.absoluteTitle } : input.title,
    description,
    alternates: { canonical: url },
    robots: input.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: input.type ?? "website",
      url,
      title: shareTitle,
      description,
      siteName: site.name,
      locale: site.locale,
      ...(images ? { images } : {}),
      ...(input.type === "article"
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime, authors: input.authors }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitter,
      title: shareTitle,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}

/** Prefer Yoast values from WordPress when present, fall back to post fields. */
export function postMetadata(post: WPPost): Metadata {
  const seo: WPSeo = post.seo ?? {};
  return buildMetadata({
    // Yoast titles usually include " - Site name"; the root title template adds it again, so trim it.
    title: (seo.title ? seo.title.replace(/\s[-|–]\s[^-|–]+$/, "") : null) ?? stripHtml(post.title),
    description: seo.metaDesc || stripHtml(post.excerpt).slice(0, 160),
    path: `/blogs/${post.slug}`,
    image: seo.opengraphImage?.sourceUrl ?? post.featuredImage?.node.sourceUrl,
    type: "article",
    // Yoast's per-post "Allow search engines to show this post?". WordPress must NOT have "Discourage
    // search engines" on — with Yoast that sets noindex on every post (see README → WordPress setup).
    noindex: seo.metaRobotsNoindex === "noindex",
    publishedTime: wpDate(post.dateGmt, post.date),
    modifiedTime: wpDate(post.modifiedGmt, post.modified),
    authors: post.author?.node.name ? [post.author.node.name] : undefined,
  });
}

/* ---------------------------- JSON-LD builders ---------------------------- */

export function organizationLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/snapdaps-mark-512.png"),
    description: site.definition,
    email: site.contactEmail,
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.contactEmail,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    founder: founders.map((f) => ({ "@type": "Person", name: f.name })),
    parentOrganization: { "@type": "Organization", name: site.company.name, url: "https://www.cygner.net/" },
    // Social profiles link the brand entity for search and AI engines — filled from content/site.ts.
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/blogs/search")}?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareLd(offers: { name: string; price: number }[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    // One of Google's supported values (PhotographyApplication isn't).
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/"),
    description: site.definition,
    featureList: coreFeatures.map((f) => f.title),
    // Only list offers once real pricing exists — placeholder prices must not reach search results.
    ...(offers.length
      ? { offers: offers.map((o) => ({ "@type": "Offer", name: o.name, price: o.price, priceCurrency: "INR" })) }
      : {}),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingLd(post: WPPost) {
  const author = post.author?.node;
  const url = absoluteUrl(`/blogs/${post.slug}`);
  const words = stripHtml(post.content ?? "").split(/\s+/).filter(Boolean).length;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    headline: stripHtml(post.title),
    description: stripHtml(post.excerpt).slice(0, 200),
    // WordPress media arrive as /media/… (see lib/wp/client.ts); schema needs absolute URLs.
    image: post.featuredImage?.node.sourceUrl ? [absoluteUrl(post.featuredImage.node.sourceUrl)] : undefined,
    datePublished: wpDate(post.dateGmt, post.date),
    dateModified: wpDate(post.modifiedGmt, post.modified),
    inLanguage: "en-IN",
    wordCount: words || undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@type": "Blog", name: `${site.name} blog`, url: absoluteUrl("/blogs") },
    author: author ? personLd(author, false) : undefined,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/brand/snapdaps-logo-1200.png") },
    },
    articleSection: post.categories?.nodes[0]?.name,
    keywords: post.tags?.nodes.map((t) => t.name).join(", ") || undefined,
  };
}

/** The blog index as a Blog with its newest posts (page one only). */
export function blogLd(posts: { title: string; slug: string; date: string; dateGmt?: string | null }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} blog`,
    url: absoluteUrl("/blogs"),
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: stripHtml(p.title),
      url: absoluteUrl(`/blogs/${p.slug}`),
      datePublished: wpDate(p.dateGmt, p.date),
    })),
  };
}

export function personLd(author: WPAuthor, withContext = true) {
  return {
    ...(withContext ? { "@context": "https://schema.org" } : {}),
    "@type": "Person",
    name: author.name,
    url: absoluteUrl(`/blogs/author/${author.slug}`),
    image: author.avatar?.url,
    description: author.description ?? undefined,
  };
}

/** One customer video testimonial, so search engines can list it as a video. */
export function videoLd(v: VideoTestimonial) {
  const m = Math.floor(v.durationSeconds / 60);
  const sec = v.durationSeconds % 60;
  const poster = videoPoster(v);
  const ytId = v.youtube ? youtubeId(v.youtube) : null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${v.name} on using ${site.name}`,
    description: v.quote,
    thumbnailUrl: [poster.startsWith("http") ? poster : absoluteUrl(poster)],
    uploadDate: v.recordedOn,
    duration: `PT${m}M${sec}S`,
    ...(ytId
      ? { embedUrl: `https://www.youtube.com/embed/${ytId}`, url: `https://www.youtube.com/watch?v=${ytId}` }
      : v.src
        ? { contentUrl: v.src.startsWith("http") ? v.src : absoluteUrl(v.src) }
        : {}),
  };
}

/** Steps of a process (e.g. /how-it-works), so answer engines can read them as an ordered how-to. */
export function howToLd(input: { name: string; description: string; path: string; steps: { name: string; text: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    step: input.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
  };
}

/** A list of linked pages (e.g. the use-cases hub). */
export function itemListLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: absoluteUrl(item.path) })),
  };
}

/**
 * The page itself, with who wrote it and when it was last updated (E-E-A-T). Author and publisher
 * are the Snapdaps organisation until named authors exist.
 */
export function webPageLd(input: { name: string; description: string; path: string; dateModified: string }) {
  const org = { "@type": "Organization", name: site.name, url: absoluteUrl("/") };
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "en-IN",
    dateModified: input.dateModified,
    author: org,
    publisher: org,
    isPartOf: { "@type": "WebSite", name: site.name, url: absoluteUrl("/") },
  };
}
