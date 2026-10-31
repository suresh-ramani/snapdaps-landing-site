import type { MetadataRoute } from "next";
import { cookiePolicy } from "@/content/legal/cookie-policy";
import { privacyPolicy } from "@/content/legal/privacy-policy";
import { refundPolicy } from "@/content/legal/refund-policy";
import { termsOfService } from "@/content/legal/terms-and-conditions";
import { marketingRoutes } from "@/content/routes";

// Legal pages carry their own "Last updated" date (content/legal/*).
const legalUpdated: Record<string, string> = {
  "/privacy-policy": privacyPolicy.updated,
  "/terms-and-conditions": termsOfService.updated,
  "/refund-policy": refundPolicy.updated,
  "/cookie-policy": cookiePolicy.updated,
};
import { absoluteUrl, wpDate } from "@/lib/utils";
import { getSitemapEntries } from "@/lib/wp/api";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // lastmod = the date the page's copy really changed (content/routes.ts `updated`, legal docs' own
  // date); pages without one (contact, blog index) omit it rather than reporting "now" on every fetch.
  const pages: MetadataRoute.Sitemap = marketingRoutes
    .filter((r) => r.indexed)
    .map((r) => ({
      url: absoluteUrl(r.path),
      ...((r.updated ?? legalUpdated[r.path]) ? { lastModified: r.updated ?? legalUpdated[r.path] } : {}),
      changeFrequency: r.path === "/blogs" ? ("daily" as const) : ("monthly" as const),
      priority: r.priority ?? 0.5,
    }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { posts, categories } = await getSitemapEntries();
    blogRoutes = [
      ...posts.map((p) => ({
        url: absoluteUrl(`/blogs/${p.slug}`),
        lastModified: new Date(wpDate(p.modifiedGmt, p.modified)),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...categories.map((c) => ({
        url: absoluteUrl(`/blogs/category/${c.slug}`),
        changeFrequency: "weekly" as const,
        priority: 0.4,
      })),
    ];
  } catch (err) {
    console.error("[sitemap] WordPress unavailable, serving static routes only", err);
  }

  return [...pages, ...blogRoutes];
}
