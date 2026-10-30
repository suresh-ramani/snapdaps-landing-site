/**
 * Content shared by more than one page: brand, navigation, CTAs, the 5-step workflow
 * and the core feature list. Copy that belongs to a single page lives in that page's
 * own page.tsx file, so each page can be edited on its own.
 *
 * Source: Website_Content_v2_1.docx. Items marked TODO are still missing from the doc.
 */

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
  contactEmail: "hello@snapdaps.ai", // TODO: confirm
  social: {
    instagram: "", // TODO
    linkedin: "", // TODO
    youtube: "", // TODO
  },
};

/**
 * Home page FAQ (rendered by <Faq>, which also emits FAQPage schema). Answers use only facts the
 * site already states: core features, the 5-step workflow and the trust line.
 * TODO: confirm with the team, and add answers the site can't make yet — pricing, face-match
 * accuracy, data retention / DPDP compliance, file-size limits.
 */
export const homeFaqs = [
  { q: "What is Snapdaps?", a: site.definition },
  {
    q: "How do guests find their photos?",
    a: "Guests open the event link or scan its QR code, then upload a selfie. Snapdaps uses AI face recognition to find every photo they appear in and shows them in seconds. They can view and download their photos right from their phone — no scrolling through thousands of images.",
  },
  {
    q: "Do guests need to install an app or create an account?",
    a: "No. Guests use the event link or QR code in their phone's browser and upload a selfie — there is no app to install and no login. That makes it easy for every guest, from friends to elderly relatives, to get their photos.",
  },
  {
    q: "Can guests see other people's photos?",
    a: "Guests only see their own photos. Face search shows each guest the photos they appear in, so personal moments stay private while everyone still gets their pictures quickly.",
  },
  {
    q: "How do I share an event with my guests?",
    a: "Each event gets one secure link and a QR code. Display the QR code at the venue, add it to invitations, or invite guests on WhatsApp. There's no need to send photos one by one or hand out pendrives and Google Drive links.",
  },
  {
    q: "How do I upload event photos?",
    a: "Create an event, add folders for each part of it (for example Haldi, Sangeet, Reception), and bulk upload thousands of photos from your computer or Google Drive. Snapdaps detects faces automatically in the background — no manual tagging.",
  },
  {
    q: "Who is Snapdaps for?",
    a: "Snapdaps is built for photographers, studios, wedding photographers and event planners who deliver photos to many guests — weddings, birthday parties, corporate events, award ceremonies and sports tournaments.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. You can start a free trial with no credit card required, and setup takes minutes.",
  },
];

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
      { label: "Wedding", href: "/use-cases/wedding-photo-sharing-app", icon: "heart" },
      { label: "Birthday party", href: "/use-cases/birthday-party", icon: "cake" },
      { label: "Corporate events", href: "/use-cases/corporate-events", icon: "briefcase" },
      { label: "Award ceremony", href: "/use-cases/award-ceremony", icon: "trophy" },
      { label: "Sports tournaments", href: "/use-cases/sports-events", icon: "medal" },
    ],
  },
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
      title: "Use cases",
      links: useCaseNav.flatMap((g) => g.links).slice(0, 5),
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blogs", href: "/blogs" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy", href: "/legal/privacy" },
        { label: "Terms", href: "/legal/terms" },
      ],
    },
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
      "Compress them if you want.",
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

export type Plan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

// TODO: pricing isn't in the content doc yet.
export const plans: Plan[] = [
  {
    name: "Free",
    price: "₹0",
    description: "Placeholder: who the free plan is for.",
    features: ["Placeholder: events included", "Placeholder: photo limit", "AI face search"],
    cta: { label: "Start free trial", href: site.signupUrl },
  },
  {
    name: "Pro",
    price: "₹—",
    period: "/month",
    description: "Placeholder: for working photographers.",
    features: ["Everything in Free", "Placeholder: higher limits", "Placeholder: branding", "Priority support"],
    cta: { label: "Start free trial", href: `${site.signupUrl}?plan=pro` },
    featured: true,
  },
  {
    name: "Studio",
    price: "Custom",
    description: "Placeholder: for studios and event companies.",
    features: ["Everything in Pro", "Placeholder: team logins", "Placeholder: custom domain"],
    cta: { label: "Talk to us", href: "/contact" },
  },
];
