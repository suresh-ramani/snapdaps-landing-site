import type { MetadataRoute } from "next";
import { marketingRoutes } from "@/content/routes";
import { absoluteUrl } from "@/lib/utils";
import { getSitemapEntries } from "@/lib/wp/api";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = marketingRoutes
    .filter((r) => r.indexed)
    .map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: now,
      changeFrequency: r.path === "/blogs" ? ("daily" as const) : ("monthly" as const),
      priority: r.priority ?? 0.5,
    }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { posts, categories } = await getSitemapEntries();
    blogRoutes = [
      ...posts.map((p) => ({
        url: absoluteUrl(`/blogs/${p.slug}`),
        lastModified: new Date(p.modified),
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
