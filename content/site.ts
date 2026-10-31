/**
 * Content shared by more than one page: brand, navigation, CTAs, the 5-step workflow
 * and the core feature list. Copy that belongs to a single page lives in that page's
 * own page.tsx file, so each page can be edited on its own.
 *
 * Source: Website_Content_v2_1.docx. Items marked TODO are still missing from the doc.
 */

/**
 * Snapdaps' founders (E-E-A-T): shown on /about and as `founder` in the Organization schema.
 * Names only, as supplied by the team — add a role, photo, bio or LinkedIn URL (`sameAs`)
 * only once the team provides them.
 */
export const founders = [
  { name: "Ketan Bhimani" },
  { name: "Dilip Vora" },
  { name: "Renish Aghera" },
] as const;

export const site = {
  name: "Snapdaps",
  domain: "snapdaps.ai",
  tagline: "AI photo sharing and face search for photographers & events",
  description:
    "Upload event photos once and let AI do the rest. Find photos quickly using AI face recognition. Perfect for photographers and event planners. Start Free Trial!",
  /**
   * The plain "Snapdaps is…" answer (≈60 words) that search and AI answer engines can quote.
   * Built only from facts the site states elsewhere (core features + workflow). Reused by the
   * home page, the FAQ, Organization/SoftwareApplication schema and /llms.txt.
   */
  definition:
    "Snapdaps is an AI photo sharing and face search platform for photographers, studios and event planners. You upload an event's photos once and get an AI photo gallery that guests open with a link or QR code. Each guest uploads a selfie, and AI face recognition shows them every photo they appear in — in seconds, with no app or login.",
  locale: "en_IN",
  twitter: "@snapdaps", // TODO: confirm handle
  appUrl: "https://app.snapdaps.ai", // TODO: confirm app URL
  signupUrl: "https://app.snapdaps.ai/signup", // TODO: confirm signup URL
  /** Free trial length on paid plans, used when the plans API sends no `trialDays` (0). */
  trialDays: 7,
  contactEmail: "hello@snapdaps.ai", // TODO: confirm
  social: {
    instagram: "https://www.instagram.com/snapdapsai",
    facebook: "https://www.facebook.com/snapdapsai",
    linkedin: "", // TODO
    youtube: "", // TODO
  },
  /** The company that owns and operates Snapdaps — footer line and Organization `parentOrganization`. */
  company: {
    name: "Cygner Technolabs Pvt. Ltd.",
    url: "https://www.cygner.net/?ref=snapdaps.ai",
  },
  /** The WhatsApp chat bubble (bottom-right on every page) opens wa.me with this number and message. */
  whatsapp: {
    number: "919409500085", // +91 94095 00085, digits only for wa.me
    display: "+91 94095 00085",
    message: "Hi Snapdaps, I’d like to know more about AI photo sharing for my event.",
  },
};

// Per-page FAQs (home included) live in content/faqs.ts.


export const cta = {
  trial: { label: "Start free trial", href: site.signupUrl },
  /** Header button label on phones/tablets, where "Start free trial" doesn't fit beside the menu. */
  trialShort: "Try for free",
  demo: { label: "Book a demo" },
  trustLine: ["No credit card required", "Setup in minutes", "Works for events of any size"],
};

export type NavLink = { label: string; href: string; description?: string; icon?: string };

export const useCaseNav: { title: string; links: NavLink[] }[] = [
  {
    title: "By role",
    links: [
      {
        label: "Photographers",
        href: "/use-cases/photo-sharing-app-for-photographers",
        description: "Deliver client photos instantly",
        icon: "camera",
      },
      {
        label: "Event planners",
        href: "/use-cases/photo-sharing-app-for-event-planners",
        description: "Give every guest their photos",
        icon: "calendar",
      },
    ],
  },
  {
    title: "By event type",
    links: [
      { label: "Wedding", href: "/use-cases/wedding-photo-sharing-app", description: "Every guest finds their wedding photos", icon: "heart" },
      { label: "Birthday party", href: "/use-cases/birthday-party", description: "Party photos to every guest, same day", icon: "cake" },
      { label: "Corporate events", href: "/use-cases/corporate-events", description: "Conference and offsite photos for attendees", icon: "briefcase" },
      { label: "Award ceremony", href: "/use-cases/award-ceremony", description: "Winners find their stage moments", icon: "trophy" },
      { label: "Sports tournaments", href: "/use-cases/sports-events", description: "Players find their action shots", icon: "medal" },
    ],
  },
];

/** The four legal pages (text in content/legal/*): footer "Legal" column and "Other policies" links. */
export const legalNav = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of service", href: "/terms-and-conditions" },
  { label: "Refund policy", href: "/refund-policy" },
  { label: "Cookie policy", href: "/cookie-policy" },
];

export const nav = {
  main: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "/how-it-works" },
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Case studies", href: "/case-studies" },
      ],
    },
    {
      title: "Features",
      links: [
        { label: "AI face search", href: "/features/ai-face-search" },
        { label: "QR code sharing", href: "/features/qr-code-photo-sharing" },
        { label: "Google Drive import", href: "/features/google-drive-import" },
        { label: "Portfolio", href: "/features/photographer-portfolio" },
        { label: "White-label app", href: "/features/white-label-mobile-app" },
      ],
    },
    {
      title: "Use cases",
      links: useCaseNav.flatMap((g) => g.links),
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blogs", href: "/blogs" },
        { label: "Contact", href: "/contact" },
      ],
    },
    { title: "Legal", links: legalNav },
  ],
};

/** The 5-step workflow. Used on the home page, /how-it-works and the use-case pages. */
export const workflowSteps = [
  {
    key: "create",
    tab: "Create event",
    title: "Create & set up your event",
    subtitle: "Create and set up your event in a couple of minutes with Snapdaps.",
    points: [
      "Create unlimited events with custom names.",
      "Create unlimited folders inside each event to categorise photos.",
      "Ready-to-use gallery with zero setup hassle.",
    ],
  },
  {
    key: "upload",
    tab: "Upload photos",
    title: "Upload photos — fast and secure",
    subtitle: "Upload your event photos in one place, in their respective folders.",
    points: [
      "Bulk upload thousands of photos.",
      "Drag and drop photos to upload.",
      "Upload from your computer and Google Drive.",
    ],
  },
  {
    key: "detect",
    tab: "AI detects faces",
    title: "AI detects faces automatically",
    subtitle: "Let Snapdaps AI do the heavy work — no manual tagging needed.",
    points: [
      "Automatically scans and detects faces.",
      "Works seamlessly in the background.",
      "Just upload, and take a rest.",
    ],
  },
  {
    key: "share",
    tab: "Share event",
    title: "Share event & invite guests",
    subtitle: "Share your event instantly with guests.",
    points: [
      "Share the event with a secure web link.",
      "Share the event with a QR code.",
      "Invite guests via WhatsApp.",
    ],
  },
  {
    key: "selfie",
    tab: "Guests upload selfie",
    title: "Guests upload a selfie to get their photos",
    subtitle:
      "No login, no confusion — guests upload a simple selfie and get their photos in seconds with AI face recognition.",
    points: ["One-click selfie upload.", "No technical steps required.", "Get photos and download."],
  },
] as const;

export type WorkflowStepKey = (typeof workflowSteps)[number]["key"];

/** Core product capabilities. Used by the bento grid and the features page. */
export const coreFeatures = [
  {
    key: "face-search",
    title: "AI face search",
    body: "Guests upload a selfie and get all their photos in seconds — no scrolling through thousands of images.",
  },
  {
    key: "gallery",
    title: "Smart photo galleries",
    body: "A clean, organised gallery for every event. Clients can access their photos anytime, from any device.",
  },
  {
    key: "upload",
    title: "Bulk photo uploads",
    body: "Upload thousands of event photos in minutes and manage them in one place.",
  },
  {
    key: "share",
    title: "QR code & link sharing",
    body: "Share the whole event with a QR code or a secure link — no manual distribution.",
  },
  {
    key: "mobile",
    title: "Mobile-first experience",
    body: "Guests find, view and download their photos right from their phones — no app required.",
  },
  {
    key: "privacy",
    title: "Privacy-first access",
    body: "Guests only see their own photos, so personal moments stay private.",
  },
] as const;

export type CoreFeatureKey = (typeof coreFeatures)[number]["key"];

/**
 * Pricing: plans, prices and limits come from the app's plans API (lib/plans.ts). This is the copy
 * around them. `paidPlanFeatures`: included in every paid plan today (from the live pricing page).
 * `comingSoonPlanFeatures`: confirmed by the team as not live yet (31 Oct 2026) — shown on /pricing
 * with a "Coming soon" tag only, never claimed anywhere else. Move one up when it ships.
 */
export const paidPlanFeatures = [
  "Unlimited face search",
  "Unlimited events",
  "Event analytics",
  "Business portfolio",
  "Custom domain for your portfolio",
  "Dynamic watermark",
  "Guest selfie pre-registration",
  "Common QR code",
  "Switch downloads on or off",
  "Bulk downloads",
  "Original-quality uploads",
  "Apple HEIC photo support",
  "Photo selection for albums",
  "Mobile apps",
] as const;

export const comingSoonPlanFeatures = [
  "SnapReel",
  "Photo sharing through a WhatsApp bot",
  "Multiple face search",
  "Compression while uploading",
] as const;

/** One-line positioning per plan key from the API (unknown keys show none). */
export const planTaglines: Record<string, string> = {
  free: "Try Snapdaps on your first events",
  lite: "For photographers getting started",
  starter: "For regular shoots",
  pro: "For busy photographers",
  "pro-plus": "For high-volume photographers",
  "pro-max": "For large studios",
  studio: "For studios and agencies",
  "studio-plus": "For studios and agencies",
};
