import type { NextConfig } from "next";

// WordPress media host, e.g. https://cms.snapdaps.ai → allow next/image to optimize its uploads.
const wpHost = (() => {
  try {
    return process.env.WP_URL ? new URL(process.env.WP_URL).hostname : undefined;
  } catch {
    return undefined;
  }
})();

// A local WordPress (Herd/Valet `*.test`, `localhost`) resolves to 127.0.0.1, which next/image refuses
// by default. Allow it only for those hosts, so the live CMS keeps the protection.
const wpIsLocal = Boolean(wpHost && (wpHost === "localhost" || /\.(test|localhost)$/.test(wpHost)));

// Every canonical, og:url, sitemap entry, robots line, schema URL and llms.txt link is built from
// NEXT_PUBLIC_SITE_URL. A production build with a missing, localhost or http:// value would point
// search engines at a dead host, so it fails on the production deploy (Vercel production, or any
// build with SITE_URL_STRICT=1) and warns loudly on every other production build (e.g. local tests).
(() => {
  if (process.env.NODE_ENV !== "production") return;
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const bad = !url || /localhost|127\.0\.0\.1|\.test\b/.test(url) || !url.startsWith("https://");
  if (!bad) return;
  const msg = `NEXT_PUBLIC_SITE_URL is "${url || "(unset)"}" — set it to the live https URL (e.g. https://www.snapdaps.ai) before a production deploy; canonicals, sitemap, robots, schema and llms.txt all use it.`;
  if (process.env.SITE_URL_STRICT === "1" || process.env.VERCEL_ENV === "production") throw new Error(msg);
  console.warn(`\n⚠ ${msg}\n`);
})();

const nextConfig: NextConfig = {
  // Self-contained server bundle for Docker / plain Node hosting. Harmless on Vercel.
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowLocalIP: wpIsLocal,
    remotePatterns: [
      ...(wpHost ? [{ protocol: "https" as const, hostname: wpHost }] : []),
      { protocol: "https", hostname: "secure.gravatar.com" },
      // YouTube thumbnails for video testimonials.
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
  // WordPress uploads are served from this site at /media/… (lib/wp/client.ts rewrites the URLs),
  // so the CMS domain never appears in HTML, image URLs, OG tags or schema. The rewrite proxies on
  // the server; next/image optimizes /media/… like any local image.
  async rewrites() {
    const wpUrl = process.env.WP_URL?.replace(/\/$/, "");
    return wpUrl ? [{ source: "/media/:path*", destination: `${wpUrl}/wp-content/uploads/:path*` }] : [];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Earlier URL scheme → /blogs (site structure in the content doc)
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/blog/:path*", destination: "/blogs/:path*", permanent: true },
      // Short use-case slugs → keyword slugs used as canonicals
      { source: "/use-cases/photographers", destination: "/use-cases/photo-sharing-app-for-photographers", permanent: true },
      { source: "/use-cases/event-planners", destination: "/use-cases/photo-sharing-app-for-event-planners", permanent: true },
      { source: "/use-cases/wedding", destination: "/use-cases/wedding-photo-sharing-app", permanent: true },
      // Placeholder legal URLs → the legal pages at the live site's URLs
      { source: "/legal/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/legal/terms", destination: "/terms-and-conditions", permanent: true },
      // Old WordPress-style permalinks → new blog routes. Adjust to your current WP permalink structure.
      { source: "/category/:slug", destination: "/blogs/category/:slug", permanent: true },
      { source: "/author/:slug", destination: "/blogs/author/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
