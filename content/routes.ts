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
};

export const marketingRoutes: MarketingRoute[] = [
  { path: "/", label: "Home", indexed: true, priority: 1 },
  { path: "/how-it-works", label: "How it works", indexed: true, priority: 0.8 },
  { path: "/features", label: "Features", indexed: true, priority: 0.8 },
  // Feature pages — draft copy by Claude; noindex until the team approves it.
  { path: "/features/ai-face-search", label: "AI face search", indexed: false },
  { path: "/features/qr-code-photo-sharing", label: "QR code photo sharing", indexed: false },
  { path: "/features/google-drive-import", label: "Google Drive import", indexed: false },
  { path: "/features/photographer-portfolio", label: "Photographer portfolio", indexed: false },
  { path: "/pricing", label: "Pricing", indexed: true, priority: 0.8 },
  { path: "/use-cases", label: "Use cases", indexed: true, priority: 0.7 },
  { path: "/use-cases/photo-sharing-app-for-photographers", label: "Photographers", indexed: true, priority: 0.9 },
  { path: "/use-cases/photo-sharing-app-for-event-planners", label: "Event planners", indexed: true, priority: 0.9 },
  { path: "/use-cases/wedding-photo-sharing-app", label: "Wedding", indexed: true, priority: 0.9 },
  // Draft copy by Claude (not in the content doc); indexed on the team's go-ahead, 2026-10-30.
  { path: "/use-cases/birthday-party", label: "Birthday party", indexed: true, priority: 0.8 },
  { path: "/use-cases/corporate-events", label: "Corporate events", indexed: true, priority: 0.8 },
  { path: "/use-cases/award-ceremony", label: "Award ceremony", indexed: true, priority: 0.8 },
  { path: "/use-cases/sports-events", label: "Sports tournaments", indexed: true, priority: 0.8 },
  // Not ready — noindex until it is.
  { path: "/case-studies", label: "Case studies", indexed: false },
  { path: "/about", label: "About", indexed: false }, // copy not in the content doc yet
  { path: "/contact", label: "Contact", indexed: true, priority: 0.5 },
  { path: "/blogs", label: "Blogs", indexed: true, priority: 0.7 },
  { path: "/legal/privacy", label: "Privacy", indexed: false },
  { path: "/legal/terms", label: "Terms", indexed: false },
];

export const isIndexed = (path: string) => marketingRoutes.find((r) => r.path === path)?.indexed ?? true;
