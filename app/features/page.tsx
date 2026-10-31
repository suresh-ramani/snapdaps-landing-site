import Link from "next/link";
import { Globe, HardDrive, Heart, Images, Link2, PhoneMissed, QrCode, ScanFace, SearchX, Smartphone, Smile, Sparkles, Usb } from "lucide-react";
import { ComparisonRows } from "@/components/blocks/comparison-rows";
import { CtaBand } from "@/components/blocks/cta-band";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { FeatureRows } from "@/components/blocks/feature-rows";
import { Hero } from "@/components/blocks/hero";
import { InfoCards } from "@/components/blocks/info-cards";
import { PageByline } from "@/components/blocks/page-byline";
import { Section } from "@/components/blocks/section";
import {
  FaceMatchCard,
  GalleryCard,
  GuestActivityCard,
  PrivacyCard,
  SelfieSearchCard,
  ShareCard,
  UploadCard,
} from "@/components/product/cards";
import { updatedOf } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   FEATURES — hand-built page. The content doc has no dedicated Features section yet,
   so this page assembles the feature copy written for the Photographers and Event
   planners pages. TODO: replace with Features-page copy (and meta) when it's ready.
------------------------------------------------------------------------------------ */

const PATH = "/features";
const TITLE = "Features: AI face search, smart galleries, QR sharing";
const DESCRIPTION =
  "AI face search, smart galleries, bulk upload and Google Drive import, QR code sharing, client photo selection and portfolios. Everything Snapdaps does for event photos.";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const learnMore = (href: string, label: string) => (
  <p>
    <Link href={href} className="font-medium text-primary hover:underline">
      {label}
    </Link>
  </p>
);

export default function FeaturesPage() {
  return (
    <>
      <Hero
        title="Everything you need to deliver event photos smarter"
        subtitle="A complete client photo delivery system powered by AI."
        body={<p>Upload once. Let AI do the rest — your guests find their photos with a selfie, on any device.</p>}
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated={updatedOf(PATH)} />}
      />

      <Section id="overview" tone="panel" title="All features at a glance">
        <FeatureBento />
      </Section>

      <Section id="details" title="How each feature works">
        <FeatureRows
          rows={[
            {
              id: "ai-face-search",
              title: "Find photos instantly with AI face search",
              body: (
                <p>
                  Stop asking clients to search manually. Guests simply upload a selfie, and Snapdaps shows all their
                  photos instantly using AI face recognition.
                </p>
              ),
              more: learnMore("/features/ai-face-search", "How AI face search works"),
              benefits: [
                "Instant photo search using a selfie",
                "No scrolling through large galleries",
                "Fast and accurate AI face recognition",
                "Personalised photo experience for every guest",
              ],
              powerLine: "From selfie to photos — in seconds.",
              visual: (
                <div className="mx-auto grid max-w-md grid-cols-[1fr_1.2fr] items-start gap-3">
                  <SelfieSearchCard className="mt-8" />
                  <FaceMatchCard />
                </div>
              ),
            },
            {
              id: "smart-gallery",
              title: "Smart photo gallery for clients",
              body: (
                <p>
                  Create a clean, organised photo gallery for every event, with folders for each part of the day.
                  Clients can access their photos anytime, from any device.
                </p>
              ),
              visual: <GalleryCard className="mx-auto max-w-md" />,
            },
            {
              id: "bulk-upload",
              title: "Upload thousands of photos in minutes",
              body: (
                <p>
                  Built for high-volume events. Drag and drop thousands of photos, upload from your computer or Google
                  Drive, and organise them into event folders.
                </p>
              ),
              more: learnMore("/features/google-drive-import", "Importing from Google Drive"),
              benefits: [
                "Drag & drop photos to upload",
                "Bulk upload thousands of photos",
                "Import from a Google Drive link",
                "Organise photos into event folders",
              ],
              visual: <UploadCard className="mx-auto max-w-md" />,
            },
            {
              id: "qr-sharing",
              title: "Share the event with a link or QR code",
              body: (
                <p>
                  One link or QR code gives guests access to the whole event. Invite guests via WhatsApp — no
                  individual sending, no follow-ups.
                </p>
              ),
              more: learnMore("/features/qr-code-photo-sharing", "How QR code sharing works"),
              powerLine: "One scan. Instant access to memories.",
              visual: <ShareCard className="mx-auto max-w-72" />,
            },
            {
              id: "mobile",
              title: "Works seamlessly on mobile",
              body: (
                <p>Guests find, view, and download their photos directly from their phones — no app required.</p>
              ),
              visual: <GuestActivityCard className="mx-auto max-w-md" />,
            },
            {
              id: "privacy",
              title: "Secure & private photo access",
              body: (
                <p>
                  Guests can access only their own photos, protecting personal moments while delivering a seamless
                  experience.
                </p>
              ),
              powerLine: "Your memories stay private — always.",
              visual: <PrivacyCard className="mx-auto max-w-md" />,
            },
          ]}
        />
      </Section>

      <Section
        id="for-photographers"
        tone="panel"
        title="More for photographers"
        intro={<p>Beyond delivery: show your work under your own brand, bring photos in from Drive, and let clients pick their favourites.</p>}
      >
        <InfoCards className="lg:grid-cols-3"
          items={[
            {
              Icon: Globe,
              title: "Portfolio",
              body: (
                <>
                  Show your best work next to the galleries you deliver.{" "}
                  <Link href="/features/photographer-portfolio" className="font-medium text-primary hover:underline">
                    About the portfolio
                  </Link>
                </>
              ),
            },
            {
              Icon: HardDrive,
              title: "Google Drive import",
              body: (
                <>
                  Paste a public Drive link and the whole shoot imports in the background.{" "}
                  <Link href="/features/google-drive-import" className="font-medium text-primary hover:underline">
                    How the import works
                  </Link>
                </>
              ),
            },
            {
              Icon: Heart,
              title: "Client photo selection",
              body: "Your client picks their favourites from the event gallery, and you see their selection — no lists of file numbers sent over WhatsApp.",
            },
            {
              Icon: Link2,
              title: "Your own domain",
              body: (
                <>
                  Publish your portfolio on your own custom domain, or on a Snapdaps subdomain.{" "}
                  <Link
                    href="/features/photographer-portfolio#custom-domain"
                    className="font-medium text-primary hover:underline"
                  >
                    Domain options
                  </Link>
                </>
              ),
            },
            {
              Icon: Smartphone,
              title: "White-label mobile app",
              body: (
                <>
                  Your studio’s own app on Android and iOS — your name, icon, logo and colours.{" "}
                  <Link href="/features/white-label-mobile-app" className="font-medium text-primary hover:underline">
                    About the studio app
                  </Link>
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section id="compare" align="center" title="Before vs. with Snapdaps">
        <ComparisonRows
          className="mx-auto max-w-4xl"
          beforeLabel="Before Snapdaps"
          rows={[
            { before: "Manually sorting thousands of photos", after: "Upload once — AI does the sorting", beforeIcon: Images, afterIcon: Sparkles },
            { before: "Sending Google Drive links or a pendrive", after: "Share one QR code or secure link", beforeIcon: Usb, afterIcon: QrCode },
            { before: "Clients struggling to find their photos", after: "Instant photo access via face search", beforeIcon: SearchX, afterIcon: ScanFace },
            { before: "Endless calls and follow-ups", after: "Zero manual effort — happy clients, more referrals", beforeIcon: PhoneMissed, afterIcon: Smile },
          ]}
        />
      </Section>

      <CtaBand title="Ready to switch to smarter photo delivery?" primaryLabel="Try Snapdaps now" />
    </>
  );
}
