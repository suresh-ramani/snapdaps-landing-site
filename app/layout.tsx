import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Devanagari } from "next/font/google";
import { draftMode } from "next/headers";
import { connection } from "next/server";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothAnchors } from "@/components/layout/smooth-anchors";
import { MotionProvider } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { organizationLd, websiteLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

// Geist — the typeface ui.shadcn.com uses. One family for headings and body.
const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Fallback for Hindi (Devanagari) in chat mocks — Geist has no Devanagari glyphs. Not preloaded;
// its unicode-range means browsers only download it on pages that show Hindi.
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: { default: "Best AI Photo Sharing & Face Search for Events | Snapdaps", template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: {
    canonical: absoluteUrl("/"),
    types: { "application/rss+xml": absoluteUrl("/blogs/rss.xml") },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // SSR: opt every route into per-request rendering. WordPress data is still
  // served from the tagged data cache (see lib/wp/client.ts), so this stays fast.
  await connection();
  const { isEnabled: isDraft } = await draftMode();

  return (
    <html lang="en" suppressHydrationWarning className={`${body.variable} ${devanagari.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <span id="top" tabIndex={-1} className="outline-none" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider>
          {isDraft && (
            <div className="bg-accent px-4 py-2 text-center text-sm text-accent-foreground">
              You&apos;re viewing a draft preview.{" "}
              <Link href="/api/preview?exit=1" className="font-medium underline">
                Exit preview
              </Link>
            </div>
          )}
          <MotionProvider>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <FloatingActions />
          </MotionProvider>
          <SmoothAnchors />
        </ThemeProvider>
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
