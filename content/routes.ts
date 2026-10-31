/**
 * Every hand-built marketing page. The sitemap reads this list, so add new pages here.
 * `indexed: false` keeps a page out of the sitemap and marks it noindex until its
 * content is final — flip it to true once the page is ready.
 */
export type MarketingRoute = {
  path: string;
  label: string;
  indexed: boolean;
  priority?: number;
  /** Date the page's copy last changed (YYYY-MM-DD) — the page's PageByline and the sitemap's lastmod
   *  both read it (`updatedOf`), so bump it here when the copy changes. */
  updated?: string;
};

export const marketingRoutes: MarketingRoute[] = [
  { path: "/", label: "Home", indexed: true, priority: 1, updated: "2026-10-31" },
  { path: "/how-it-works", label: "How it works", indexed: true, priority: 0.8, updated: "2026-10-30" },
  { path: "/features", label: "Features", indexed: true, priority: 0.8, updated: "2026-10-31" },
  // Feature pages — draft copy by Claude; noindex until the team approves it.
  { path: "/features/ai-face-search", label: "AI face search", indexed: false, updated: "2026-10-31" },
  { path: "/features/qr-code-photo-sharing", label: "QR code photo sharing", indexed: false, updated: "2026-10-31" },
  { path: "/features/google-drive-import", label: "Google Drive import", indexed: false, updated: "2026-10-31" },
  { path: "/features/photographer-portfolio", label: "Photographer portfolio", indexed: false, updated: "2026-10-31" },
  { path: "/features/white-label-mobile-app", label: "White-label mobile app", indexed: false, updated: "2026-10-31" },
  { path: "/pricing", label: "Pricing", indexed: true, priority: 0.8, updated: "2026-10-31" },
  { path: "/use-cases", label: "Use cases", indexed: true, priority: 0.7, updated: "2026-10-30" },
  { path: "/use-cases/photo-sharing-app-for-photographers", label: "Photographers", indexed: true, priority: 0.9, updated: "2026-10-31" },
  { path: "/use-cases/photo-sharing-app-for-event-planners", label: "Event planners", indexed: true, priority: 0.9, updated: "2026-10-31" },
  { path: "/use-cases/wedding-photo-sharing-app", label: "Wedding", indexed: true, priority: 0.9, updated: "2026-10-30" },
  // Draft copy by Claude (not in the content doc); indexed on the team's go-ahead, 2026-10-30.
  { path: "/use-cases/birthday-party", label: "Birthday party", indexed: true, priority: 0.8, updated: "2026-10-31" },
  { path: "/use-cases/corporate-events", label: "Corporate events", indexed: true, priority: 0.8, updated: "2026-10-31" },
  { path: "/use-cases/award-ceremony", label: "Award ceremony", indexed: true, priority: 0.8, updated: "2026-10-31" },
  { path: "/use-cases/sports-events", label: "Sports tournaments", indexed: true, priority: 0.8, updated: "2026-10-31" },
  // Not ready — noindex until it is.
  { path: "/case-studies", label: "Case studies", indexed: false },
  { path: "/about", label: "About", indexed: false }, // copy not in the content doc yet
  { path: "/contact", label: "Contact", indexed: true, priority: 0.5 },
  { path: "/blogs", label: "Blogs", indexed: true, priority: 0.7 },
  // Legal text from the live snapdaps.ai pages (content/legal/*), same URLs as the old site.
  { path: "/privacy-policy", label: "Privacy policy", indexed: true, priority: 0.3 },
  { path: "/terms-and-conditions", label: "Terms of service", indexed: true, priority: 0.3 },
  { path: "/refund-policy", label: "Refund policy", indexed: true, priority: 0.3 },
  { path: "/cookie-policy", label: "Cookie policy", indexed: true, priority: 0.3 },
];

export const isIndexed = (path: string) => marketingRoutes.find((r) => r.path === path)?.indexed ?? true;

/** A page's last-updated date from this list — throws so a dated page can't silently lose its date. */
export function updatedOf(path: string): string {
  const updated = marketingRoutes.find((r) => r.path === path)?.updated;
  if (!updated) throw new Error(`content/routes.ts: no \`updated\` date for ${path}`);
  return updated;
}
