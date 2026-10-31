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
