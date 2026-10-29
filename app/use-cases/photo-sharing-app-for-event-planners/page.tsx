import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { CtaBand, MiniCta } from "@/components/blocks/cta-band";
import { FeatureRows } from "@/components/blocks/feature-rows";
import { Hero } from "@/components/blocks/hero";
import { OfferGrid } from "@/components/blocks/offer-grid";
import { PowerLine, Section } from "@/components/blocks/section";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { FaceMatchCard, PrivacyCard, SelfieSearchCard, ShareCard, UploadCard } from "@/components/product/cards";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   USE CASE · EVENT PLANNERS — Website_Content_v2_1.docx
   Keywords: event photo sharing platform, photo sharing app for events,
   photo sharing for events, free photo sharing (online).
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/photo-sharing-app-for-event-planners";

export const metadata = buildMetadata({
  absoluteTitle: "Event Photo Sharing Platform with AI Face Search | Snapdaps",
  description:
    "Share event photos instantly with AI face search. Best event photo sharing platform for corporate events, weddings, and parties. Free photo sharing for events.",
  path: PATH,
});

export default function EventPlannersPage() {
  return (
    <>
      {/* Section 1: Hero */}
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Use cases", path: "/use-cases" },
              { name: "Event planners", path: PATH },
            ]}
          />
        }
        title="Event Photo Sharing Platform with AI Face Search"
        subtitle="Give your guests instant access to their photos. Turn every guest into a brand promoter."
        body={
          <p>
            Upload event photos once and let guests find their photos instantly using AI face recognition — no waiting,
            no manual sharing, just a seamless event experience.
          </p>
        }
        hook="Your event doesn’t end when it’s over — it lives on through shared moments."
        note="Perfect for corporate events, weddings, parties, and large gatherings."
      />

      <LogoCloud />

      {/* Section 2: Features (alternating rows; each title is an H2 per the doc) */}
      <Section id="features">
        <FeatureRows
          headingLevel="h2"
          rows={[
            {
              id: "ai-face-search",
              title: "AI face search for event participants",
              body: (
                <>
                  <p>Snapdaps enables event participants to find their photos instantly using AI face search.</p>
                  <p>
                    Guests simply upload a selfie, and the platform automatically shows all their photos — no manual
                    searching, no browsing through thousands of images.
                  </p>
                </>
              ),
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
              id: "qr-sharing",
              title: "Share event photos via QR code or secure link",
              body: (
                <>
                  <p>Share your entire event photo gallery with guests using a simple QR code or secure web link.</p>
                  <p>
                    No need to send photos individually or share multiple folders — one link gives access to the
                    entire event.
                  </p>
                </>
              ),
              benefits: [
                "One link for the entire event",
                "Instant access via QR code scan",
                "No manual sharing or follow-ups",
                "Perfect for large events and crowds",
              ],
              powerLine: "One scan. Instant access to memories.",
              visual: <ShareCard className="mx-auto max-w-72" />,
            },
            {
              id: "bulk-upload",
              title: "Bulk photo upload",
              body: (
                <>
                  <p>Upload thousands of event photos in minutes without limits.</p>
                  <p>
                    Snapdaps is built for high-volume events where thousands of photos need to be uploaded, managed, and
                    delivered quickly.
                  </p>
                </>
              ),
              benefits: [
                "Drag & drop photos to upload",
                "Bulk upload thousands of photos",
                "Fast, optimised upload performance",
                "Organise photos into event folders",
              ],
              powerLine: "From thousands of photos to instant delivery — without the stress.",
              visual: <UploadCard className="mx-auto max-w-md" />,
            },
            {
              id: "privacy",
              title: "Privacy-first photo sharing for your events",
              body: (
                <>
                  <p>
                    Snapdaps is designed with privacy at its core, ensuring that event photos are shared securely and
                    only with the right people.
                  </p>
                  <p>
                    Guests can access only their own photos, protecting personal moments while delivering a seamless
                    experience.
                  </p>
                </>
              ),
              powerLine: "Your memories stay private — always.",
              visual: <PrivacyCard className="mx-auto max-w-md" />,
            },
          ]}
        />
        <h3 className="mx-auto mt-20 max-w-2xl text-center text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
          This isn’t just a feature set. It’s a smarter way to deliver event experiences.
        </h3>
        <MiniCta lead="Ready to upgrade your event photo delivery?" label="Start free trial" />
      </Section>

      {/* Section 3: What Snapdaps offers */}
      <Section
        id="offer"
        title="Everything you need for smart event photo sharing"
        intro={
          <p>
            Deliver a seamless, AI-powered photo experience for every guest — before, during, and after your event.
          </p>
        }
      >
        <OfferGrid
          items={[
            {
              key: "face-search",
              title: "AI face search",
              body: "Allow guests to find photos instantly using AI face recognition — just upload a selfie and get all your photos in seconds.",
            },
            {
              key: "gallery",
              title: "Smart photo galleries",
              body: "Create clean, organised event galleries where guests can easily access and explore their photos.",
            },
            {
              key: "share",
              title: "QR code & link sharing",
              body: "Share your event instantly with a QR code or secure link — no manual distribution needed.",
            },
            {
              key: "upload",
              title: "Bulk photo uploads",
              body: "Upload thousands of event photos quickly and manage them effortlessly in one place.",
            },
            {
              key: "mobile",
              title: "Mobile-first experience",
              body: "Guests can find, view, and download their photos directly from their phones — no app required.",
            },
            {
              key: "privacy",
              title: "Privacy-first access",
              body: "Ensure secure photo sharing where guests only see their own photos, protecting personal memories.",
            },
          ]}
        />
        <PowerLine className="mt-12 text-center">From upload to sharing — everything is automated with AI.</PowerLine>
      </Section>

      {/* Section 4: CTA */}
      <CtaBand
        title="AI-powered photo sharing app for event planners"
        body="Be among the first event planners in the world to offer AI-powered photo sharing. Upload once, share the event. Give your guests instant access to their photos — and an experience they’ll remember."
      />
    </>
  );
}
