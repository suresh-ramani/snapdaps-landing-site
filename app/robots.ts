import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";
  // Keep staging/preview deployments out of the index.
  if (!isProd || process.env.NEXT_PUBLIC_SITE_URL?.includes("staging")) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/blogs/preview/", "/blogs/search"] }],
    // No `host`: the Host directive is non-standard (only Yandex ever read it); canonicals do that job.
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
