import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * WordPress dates as ISO-8601 with a timezone. WPGraphQL's `date`/`modified` are the site's local
 * time with no offset, which search engines can't place; `dateGmt`/`modifiedGmt` are UTC without
 * the "Z". Prefer GMT, fall back to the local value.
 */
export function wpDate(gmt?: string | null, local?: string) {
  if (gmt) return gmt.endsWith("Z") ? gmt : `${gmt}Z`;
  return local ?? "";
}

export function absoluteUrl(path = "/") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(iso),
  );
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&amp;/g, "&")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/\[&hellip;\]|\[…\]/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

export function readingTime(html: string) {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

/** `lang="hi"` for text written in Devanagari, so screen readers switch to Hindi. */
export function hindiLang(text: string) {
  return /[ऀ-ॿ]/.test(text) ? "hi" : undefined;
}
