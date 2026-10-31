import { CalendarDays, Camera, Megaphone, QrCode, Send, Share2 } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { EventPhotoHero } from "@/components/blocks/event-photo-hero";
import { LeadCapture } from "@/components/blocks/lead-capture";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { LottieScene } from "@/components/motion/lottie-scene";
import { CtaBand, MiniCta } from "@/components/blocks/cta-band";
import { Faq } from "@/components/blocks/faq";
import { FeatureRows } from "@/components/blocks/feature-rows";
import { Hero } from "@/components/blocks/hero";
import { InfoCards } from "@/components/blocks/info-cards";
import { OfferGrid } from "@/components/blocks/offer-grid";
import { PageByline } from "@/components/blocks/page-byline";
import { QuestionSection } from "@/components/blocks/question-section";
import { PowerLine, Section } from "@/components/blocks/section";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { FaceMatchCard, PrivacyCard, SelfieSearchCard, ShareCard, UploadCard } from "@/components/product/cards";
import { eventSamples } from "@/components/mock/photos";
import { PhotoPool } from "@/components/mock/photo-pool";
import { faqs } from "@/content/faqs";
import { updatedOf } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   USE CASE · EVENT PLANNERS — Website_Content_v2_1.docx
   Keywords: event photo sharing platform, photo sharing app for events,
   photo sharing for events, free photo sharing (online).
   Added (draft copy by Claude — not from the content doc; reviewed by: pending): the
   question sections (sharing with every guest, QR code, guests as promoters) and the FAQ.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/photo-sharing-app-for-event-planners";
const TITLE = "Event Photo Sharing Platform with AI Face Search | Snapdaps";
const DESCRIPTION =
  "Share event photos instantly with AI face search. Best event photo sharing platform for corporate events, weddings, and parties. Free photo sharing for events.";

export const metadata = buildMetadata({
  absoluteTitle: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function EventPlannersPage() {
  return (
    <PhotoPool {...eventSamples[PATH]}>
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
        note={
          <>
            <p>Perfect for corporate events, weddings, parties, and large gatherings.</p>
            <PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated={updatedOf(PATH)} className="mt-2" />
          </>
        }
        visual={
          <EventPhotoHero
            photo="venue-banquet"
            alt="Banquet hall set with round tables, ready for an event"
            chips={[
              {
                Icon: QrCode,
                title: "QR at registration",
                sub: "Guests scan on arrival",
              },
              {
                Icon: Share2,
                title: "Shared the same day",
                sub: "Guests post their own photos",
              },
            ]}
            qrLabel="Scan for event photos"
            align="right"
          />
        }
      />

      <UseCaseLead
        title="Snapdaps for event planners, in short"
        summary="Snapdaps gives every guest at your event their own photos without you sending a single file. The photographer uploads once, faces are detected automatically, and you place one QR code where guests pause — registration, tables, the stage. Guests take a selfie, download their photos and share them, carrying your event further."
        takeaways={[
          "One QR code or link covers the whole event.",
          "Guests see only the photos they’re in.",
          "Folders by day, session or venue, for events of any size.",
          "No app or login for guests.",
        ]}
        bestFor={["Event planners", "Wedding planners", "Event management companies"]}
        scene={<LottieScene src="/animations/event-planning.json" className="mx-auto max-w-md" />}
        sceneCaption="Plan the event, place the QR code where guests pause, and every guest leaves with their photos."
        tone="panel"
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
                    No need to send photos individually or share multiple folders — one link gives access to the entire
                    event.
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
        tone="panel"
        title="Everything you need for smart event photo sharing"
        intro={
          <p>Deliver a seamless, AI-powered photo experience for every guest — before, during, and after your event.</p>
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

      <QuestionSection
        id="share-with-every-guest"
        question="How do event planners share photos with every guest?"
        answer="Upload the event’s photos to Snapdaps once and share one link or QR code with every guest. Each guest uploads a selfie and gets only their own photos, so you never collect requests, forward folders or chase the photographer. It’s a photo sharing app for events that handles delivery for gatherings of any size."
      >
        <InfoCards
          items={[
            {
              Icon: CalendarDays,
              title: "Before the event",
              body: "Print the QR code on invitations, badges or signage, so guests know where their photos will be.",
            },
            {
              Icon: Camera,
              title: "On the day",
              body: "Your photographer uploads the photos when they’re ready. Faces are detected automatically.",
            },
            {
              Icon: Send,
              title: "After the event",
              body: "Send the link to every attendee in one message — by email or WhatsApp — and you’re done.",
            },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="qr-code"
        tone="panel"
        question="Can guests get their photos with a QR code?"
        answer="Yes. Every event in Snapdaps has its own QR code. Guests scan it with their phone camera, upload a selfie and see their photos — no app, no login and no typing a long link. Put it on registration desks, table cards, screens or the backdrop, and guests can find their photos as soon as they’re uploaded."
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto]">
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Registration desk",
              "Table cards",
              "Stage screens",
              "Photo backdrop",
              "Printed invitations",
              "Thank-you message",
            ].map((place) => (
              <li key={place} className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 ring-1 ring-border">
                <QrCode className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {place}
              </li>
            ))}
          </ul>
          <div aria-hidden="true" data-nosnippet>
            <ShareCard className="mx-auto w-72" />
          </div>
        </div>
      </QuestionSection>

      <QuestionSection
        id="guests-as-promoters"
        question="How does photo sharing turn guests into promoters?"
        answer="Guests who get their photos quickly share them — on WhatsApp, Instagram or LinkedIn — while the event is still fresh. Every shared photo shows your event to their friends, family and colleagues. With Snapdaps, guests download their own photos straight to their phone, so sharing happens on its own instead of weeks later, or never."
      >
        <InfoCards
          items={[
            {
              Icon: Send,
              title: "Photos arrive while it’s fresh",
              body: "Guests have their photos the same day, when they most want to post them.",
            },
            {
              Icon: Share2,
              title: "Shared from their own phones",
              body: "Downloads land on the guest’s phone, ready for their stories, groups and feeds.",
            },
            {
              Icon: Megaphone,
              title: "Your event, seen again",
              body: "Each post puts your event in front of people who weren’t there — without an ad.",
            },
          ]}
        />
      </QuestionSection>

      <LeadCapture
        title="Plan photo delivery into your next event"
        body="Tell us about your next event and we’ll show you where Snapdaps fits — QR placement, folders and how guests get their photos."
        points={[
          "A walkthrough built around your event type",
          "Help creating the event and its QR code",
          "A reply within one working day",
        ]}
        event="Event planning"
        role="Event planner"
        submitLabel="Book my planner demo"
        tone="panel"
      />

      <Faq items={faqs[PATH]} title="Questions event planners ask" />

      {/* Section 4: CTA */}
      <CtaBand
        title="AI-powered photo sharing app for event planners"
        body="Be among the first event planners in the world to offer AI-powered photo sharing. Upload once, share the event. Give your guests instant access to their photos — and an experience they’ll remember."
      />
    </PhotoPool>
  );
}
