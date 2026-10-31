import { Images, QrCode, ScanFace, Send } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { EventPhotoHero } from "@/components/blocks/event-photo-hero";
import { LeadCapture } from "@/components/blocks/lead-capture";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { PhotographerScene } from "@/components/mock/event-scenes";
import { ComparisonRows } from "@/components/blocks/comparison-rows";
import { CtaBand } from "@/components/blocks/cta-band";
import { Faq } from "@/components/blocks/faq";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { Hero } from "@/components/blocks/hero";
import { WorkflowSteps } from "@/components/blocks/how-it-works";
import { InfoCards } from "@/components/blocks/info-cards";
import { PageByline } from "@/components/blocks/page-byline";
import { QuestionSection } from "@/components/blocks/question-section";
import { PowerLine, Section } from "@/components/blocks/section";
import { Story } from "@/components/blocks/story";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { eventSamples } from "@/components/mock/photos";
import { PhotoPool } from "@/components/mock/photo-pool";
import { ChatMock } from "@/components/mock/screens";
import { FaceMatchCard, SelfieSearchCard } from "@/components/product/cards";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   USE CASE · PHOTOGRAPHERS — Website_Content_v2_1.docx
   Primary keyword: photo sharing app for photographers
   Also: wedding photo sharing app, face recognition photo sharing, how to share photos
   with clients, best way to deliver photos to clients, photo gallery for clients.
   Added (draft copy by Claude — not from the content doc; reviewed by: pending): the
   question sections (AI photo gallery for photographers, how to deliver photos to clients,
   Google Drive alternative) and the FAQ.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/photo-sharing-app-for-photographers";
const TITLE = "Photo Sharing App for Photographers with AI Face Search | Snapdaps";
const DESCRIPTION =
  "Deliver client photos instantly with AI face search. No Google Drive links or Pendrive hassle. Built for photographers, weddings, and events.";

export const metadata = buildMetadata({
  absoluteTitle: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function PhotographersPage() {
  return (
    <PhotoPool {...eventSamples[PATH]}>
      {/* Section 1: Hero */}
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Use cases", path: "/use-cases" },
              { name: "Photographers", path: PATH },
            ]}
          />
        }
        title="Photo Sharing App for Photographers with AI Face Search"
        // Doc has 3 versions of this line; using Version 2. Alternatives:
        //  v1 "Tired of sharing photos manually? Let AI do it for you"
        //  v3 "Deliver client photos instantly by QR code or secure weblink"
        subtitle="Deliver client photos instantly without manual work"
        body={
          <p>
            Stop sending photos by Google Drive or a pendrive. Let your clients find their photos instantly using AI
            face recognition — fast, secure, simple, and hassle-free.
          </p>
        }
        hook="You shoot premium photos. Snapdaps delivers them."
        trustLine={["No credit card required", "Setup in minutes", "Built for photographers"]}
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated="2026-10-30" />}
        visual={
          <EventPhotoHero
            photo="photographer-at-work"
            alt="Photographer framing a shot through a DSLR camera"
            chips={[
              {
                Icon: ScanFace,
                title: "Faces detected",
                sub: "Across the whole shoot",
              },
              {
                Icon: Send,
                title: "One link to your client",
                sub: "Guests find their own photos",
              },
            ]}
            qrLabel="Client gallery QR"
            align="left"
          />
        }
      />

      <UseCaseLead
        title="Snapdaps for photographers, in short"
        summary="Snapdaps is an AI photo gallery for photographers. You upload a finished shoot once, Snapdaps detects every face, and you hand your client a single link or QR code. Each guest uploads a selfie and downloads only the photos they appear in — so delivery no longer means days of sorting and sending."
        takeaways={[
          "Upload from your computer or Google Drive, in folders per event.",
          "No tagging — faces are detected automatically.",
          "One link or QR code replaces pendrives and Drive folders.",
          "Your clients’ guests need no app and no login.",
        ]}
        bestFor={["Wedding photographers", "Event photographers", "Studios"]}
        scene={<PhotographerScene />}
        sceneCaption="From your camera to every guest’s phone: upload once, Snapdaps sorts by face, and you send one link."
        tone="default"
      />

      <LogoCloud />

      {/* Section 2: Story-driven problem */}
      <Story
        id="problem"
        tone="problem"
        title="Your customer didn’t receive their event photos on time."
        subtitle="Modern clients expect instant photo access — not delays of days or weeks."
        visual={
          <ChatMock
            title="Family group"
            messages={["Hey, send me the wedding photos!", "मेरा फोटो भेजो ना…", "Did you get our group pictures?"]}
          />
        }
        narrative={
          <>
            <p>
              The wedding is over.
              <br />
              Your client is back home.
            </p>
            <p>Friends and relatives start calling your customer…</p>
            <p className="space-y-2">
              <span className="quote">“Hey, send me the wedding photos!”</span>
              <span className="quote">“Mera photo bhejo na…”</span>
              <span className="quote">“Did you get our group pictures?”</span>
            </p>
            <p>
              But your client doesn’t have anything to share yet — because the photographer hasn’t delivered the photos.
            </p>
            <div>
              <p>Now your client is:</p>
              <ul className="mt-2 list-disc pl-6">
                <li>Waiting for updates</li>
                <li>Feeling awkward replying again and again</li>
              </ul>
            </div>
            <p>And slowly… frustration starts building.</p>
          </>
        }
        powerLine="Your client wants to share memories instantly with their friends and family. But traditional photo delivery makes them wait."
        close={
          <>
            <p>
              When your clients don’t get their photos on time, it doesn’t just delay delivery — it affects their
              experience.
            </p>
            <p className="font-semibold">In today’s instant-sharing world, waiting days for photos feels outdated.</p>
          </>
        }
      />

      {/* Section 3: Story-driven solution */}
      <Story
        id="solution"
        tone="solution"
        reverse
        title="What if your customers could share their event photos instantly?"
        subtitle="You deliver your customer’s event photos instantly, and they can share them with friends and family on time."
        visual={
          <div className="surface-soft grid grid-cols-1 items-start gap-3 p-6 sm:grid-cols-[1fr_1.2fr] md:p-8">
            <SelfieSearchCard className="sm:mt-8" />
            <FaceMatchCard />
          </div>
        }
        narrative={
          <>
            <p>Now imagine a different experience.</p>
            <p>The event just got over. Instead of waiting a month… your client opens the event link you shared.</p>
            <p>
              They upload a simple selfie. And within seconds, all their photos appear automatically by{" "}
              <strong>AI face recognition</strong>.
            </p>
            <p className="font-semibold text-foreground">No searching. No asking. No waiting.</p>
            <p>
              Now when friends and relatives call — <strong className="text-foreground">“Send photos!”</strong> — your
              client simply shares them instantly.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-medium text-foreground">They feel:</p>
                <ul className="mt-2 list-disc pl-6">
                  <li>Happy</li>
                  <li>Confident</li>
                  <li>Excited to share</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground">And you didn’t have to:</p>
                <ul className="mt-2 list-disc pl-6">
                  <li>Deliver a pendrive of photos to their doorstep</li>
                  <li>Reply to every call and message</li>
                </ul>
              </div>
            </div>
          </>
        }
      />

      <Section id="what-snapdaps-does" tone="panel" title="This is exactly what Snapdaps does.">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Snapdaps is an AI-powered photo sharing app for photographers that turns your photo delivery into an
              instant experience.
            </p>
            <p>You upload photos once. Your customers find their photos themselves using AI face search.</p>
            <p>
              You just upload the photos on Snapdaps and let AI do the rest. You only share the QR code or web link with
              your customers.
            </p>
          </div>
          <PowerLine className="surface p-6">Your customers get their photos instantly with Snapdaps.</PowerLine>
        </div>
      </Section>

      {/* Section 4: How Snapdaps works */}
      <Section
        id="how-it-works"
        title="Your workflow after every event — simplified"
        intro={<p>From hours of manual work to a few clicks — here’s how your photo delivery changes with Snapdaps.</p>}
      >
        <WorkflowSteps />
        <p className="mt-10 text-center font-display text-2xl font-semibold">
          Your work ends after upload. <span className="text-primary">Snapdaps takes care of the rest.</span>
        </p>
      </Section>

      <QuestionSection
        id="ai-photo-gallery"
        tone="panel"
        question="What is an AI photo gallery for photographers?"
        answer="An AI photo gallery is an online event gallery that sorts itself by face. You upload the whole shoot once; Snapdaps detects every face, and each client or guest opens the gallery with a selfie to see only the photos they’re in. It replaces sending photos person by person, and nobody has to scroll through thousands of images."
      >
        <InfoCards
          items={[
            {
              Icon: Images,
              title: "Organised by event and folder",
              body: "One event per shoot, with folders for each part of the day — the gallery is ready the moment uploads finish.",
            },
            {
              Icon: ScanFace,
              title: "Searchable by face",
              body: "Faces are detected automatically, so a selfie replaces scrolling, tagging and photo numbers.",
            },
            {
              Icon: QrCode,
              title: "Delivered by link or QR code",
              body: "Your client gets one link or QR code to pass on; every guest finds their own photos from it.",
            },
          ]}
        />
      </QuestionSection>

      {/* Section 5: Features */}
      <Section
        id="features"
        title="Everything you need to deliver photos smarter"
        intro={
          <p>
            Snapdaps is more than just a photo sharing app for photographers — it’s a complete client photo delivery
            system powered by AI.
          </p>
        }
      >
        <FeatureBento
          items={[
            {
              key: "face-search",
              title: "Find photos instantly with AI face search",
              body: "Stop asking clients to search manually. Your clients simply upload a selfie, and Snapdaps shows all their photos instantly using AI face recognition.",
            },
            {
              key: "gallery",
              title: "Smart photo gallery for clients",
              body: "Create a clean, organised photo gallery for every event. Clients can access their photos anytime, from any device.",
            },
            {
              key: "upload",
              title: "Upload thousands of photos in minutes",
              body: "Upload all your event photos in one place without worrying about size or quantity.",
            },
            {
              key: "share",
              title: "Share event with link or QR code",
              body: "Share your event instantly with clients and guests using a simple link or QR code.",
            },
            {
              key: "mobile",
              title: "Works seamlessly on mobile",
              body: "Your clients can find and download their photos directly from their phones.",
            },
            {
              key: "privacy",
              title: "Secure & private photo access",
              body: "Your event photos are secure and accessible only to your clients.",
            },
          ]}
        />
        <h3 className="mt-12 text-center font-display text-2xl font-semibold">
          This is not just a tool. It’s your complete photo delivery system.
        </h3>
      </Section>

      <QuestionSection
        id="deliver-photos"
        tone="panel"
        question="How do photographers deliver photos to clients with Snapdaps?"
        answer="Upload the shoot to an event in Snapdaps, then send your client one link or QR code. The client forwards it to family and guests — on WhatsApp, in an invitation or on a printed card — and each person finds their own photos with a selfie. No pendrives, no Drive folders and no photos sent one by one."
      >
        <InfoCards
          numbered
          items={[
            {
              title: "Upload the shoot",
              body: "From your computer or Google Drive, into folders for each part of the event.",
            },
            {
              title: "Send your client the link",
              body: "One secure link and QR code for the whole event — the only thing you hand over.",
            },
            {
              title: "Your client passes it on",
              body: "Into the family WhatsApp group, onto a printed card, or into a thank-you message.",
            },
            {
              title: "Everyone finds their photos",
              body: "Each guest uploads a selfie and downloads the photos they appear in.",
            },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="google-drive-alternative"
        question="Is Snapdaps a Google Drive alternative for photographers?"
        answer="Yes, for delivering event photos. A shared Drive folder gives every guest the same link, and each of them scrolls through everything to find themselves. Snapdaps keeps Drive as a source — you can upload straight from it — but each guest sees only their own photos after a selfie, in a gallery organised by event and folder."
      >
        <ComparisonRows
          beforeLabel="Shared Drive folder or pendrive"
          afterLabel="Snapdaps AI photo gallery"
          rows={[
            {
              before: "One shared folder for everyone",
              after: "Each guest sees only the photos they’re in",
            },
            {
              before: "Guests scroll through every photo to find themselves",
              after: "A selfie finds their photos in seconds",
            },
            {
              before: "Pendrives handed over one by one",
              after: "One link or QR code for the whole event",
            },
            {
              before: "Photos sorted and renamed by hand",
              after: "Faces detected automatically on upload",
            },
          ]}
        />
      </QuestionSection>

      <LeadCapture
        title="See your next shoot delivered by face search"
        body="Book a short demo and we’ll walk you through delivering a real event the Snapdaps way — from upload to a guest finding their photos with a selfie."
        points={[
          "See the guest experience on your own phone",
          "Set up your first client event with our team",
          "Questions answered within one working day",
        ]}
        event="Photographer delivery"
        role="Photographer"
        submitLabel="Book my photographer demo"
        tone="panel"
      />

      <Faq items={faqs[PATH]} title="Questions photographers ask" />

      {/* Section 6: CTA */}
      <CtaBand
        title="Ready to simplify your workflow and give your customers this AI experience?"
        primaryLabel="Try Snapdaps now"
        trustLine={["No credit card required", "Setup in minutes", "Built for photographers"]}
      />
    </PhotoPool>
  );
}
