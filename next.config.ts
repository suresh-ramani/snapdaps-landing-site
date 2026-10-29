import type { NextConfig } from "next";

// WordPress media host, e.g. https://cms.snapdaps.ai → allow next/image to optimize its uploads.
const wpHost = (() => {
  try {
    return process.env.WP_URL ? new URL(process.env.WP_URL).hostname : undefined;
  } catch {
    return undefined;
  }
})();

const nextConfig: NextConfig = {
  // Self-contained server bundle for Docker / plain Node hosting. Harmless on Vercel.
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      ...(wpHost ? [{ protocol: "https" as const, hostname: wpHost }] : []),
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
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
      // Old WordPress-style permalinks → new blog routes. Adjust to your current WP permalink structure.
      { source: "/category/:slug", destination: "/blogs/category/:slug", permanent: true },
      { source: "/author/:slug", destination: "/blogs/author/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
