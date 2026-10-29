import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 "proxy" (formerly middleware).
 *
 * Every page is server-rendered on request. To keep TTFB low, this tells the CDN in
 * front of the app (Vercel, Cloudflare, CloudFront) it may hold public HTML briefly
 * and serve a stale copy while it refetches. Next.js manages the browser-facing
 * Cache-Control header itself, so we use the CDN-specific headers, which it leaves alone.
 *
 * Never CDN-cached: API routes, draft previews, search results.
 */
const CDN_CACHE = "public, s-maxage=60, stale-while-revalidate=600";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const isDraft = request.cookies.has("__prerender_bypass");
  const skip =
    isDraft ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/blogs/preview") ||
    pathname.startsWith("/blogs/search");

  if (!skip && request.method === "GET") {
    response.headers.set("CDN-Cache-Control", CDN_CACHE);
    response.headers.set("Cloudflare-CDN-Cache-Control", CDN_CACHE);
    response.headers.set("Vercel-CDN-Cache-Control", CDN_CACHE);
  } else {
    response.headers.set("CDN-Cache-Control", "no-store");
  }
  return response;
}

export const config = {
  // Skip static assets and image optimizer.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|txt|xml)$).*)"],
};
