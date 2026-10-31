import { Gift, Mail, ScanFace, Signpost, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { EventPhotoHero } from "@/components/blocks/event-photo-hero";
import { LeadCapture } from "@/components/blocks/lead-capture";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { LottieScene } from "@/components/motion/lottie-scene";
import { ComparisonRows } from "@/components/blocks/comparison-rows";
import { CtaBand } from "@/components/blocks/cta-band";
import { Faq } from "@/components/blocks/faq";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { Hero } from "@/components/blocks/hero";
import { WorkflowSteps, type WorkflowStep } from "@/components/blocks/how-it-works";
import { InfoCards } from "@/components/blocks/info-cards";
import { PageByline } from "@/components/blocks/page-byline";
import { QuestionSection } from "@/components/blocks/question-section";
import { Section } from "@/components/blocks/section";
import { Story } from "@/components/blocks/story";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { eventSamples } from "@/components/mock/photos";
import { PhotoPool } from "@/components/mock/photo-pool";
import { ChatMock } from "@/components/mock/screens";
import { faqs } from "@/content/faqs";
import { updatedOf } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   USE CASE · WEDDING — Website_Content_v2_1.docx
   Keywords: wedding photo sharing app, wedding photo sharing, wedding picture sharing
   app, wedding photo app for guests, best wedding photo sharing app.

   Hero, story and CTA buttons from the doc. Draft copy by Claude — not from the content
   doc; reviewed by: pending: the CTA heading (blank in the doc), the wedding steps, the
   features, the question sections and the FAQ.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/wedding-photo-sharing-app";
const TITLE = "Wedding Photo Sharing App with AI Face Search | Snapdaps";
const DESCRIPTION =
  "Share wedding photos by QR Code and secure link with guests. Guests can find their photos in seconds with AI face recognition by uploading a selfie.";

export const metadata = buildMetadata({
  absoluteTitle: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

/** The five steps, told for a wedding (same keys, so the product visuals still match). */
const weddingSteps: WorkflowStep[] = [
  {
    key: "create",
    title: "Create the wedding, a folder per function",
    subtitle: "Set up one wedding event in minutes, with folders that match the celebration.",
    points: [
      "Folders for Haldi, Mehndi, Sangeet, Pheras and Reception.",
      "Name the event after the couple.",
      "The wedding gallery is ready as soon as it’s created.",
    ],
  },
  {
    key: "upload",
    title: "Upload every function’s photos",
    subtitle: "Add each function’s photos to its folder, from a computer or Google Drive.",
    points: [
      "Bulk upload thousands of photos per function.",
      "Upload each function as soon as its photos are ready.",
      "Add more photos to a function any time.",
    ],
  },
  {
    key: "detect",
    title: "Faces are found across all functions",
    subtitle: "Snapdaps detects every guest’s face in every folder — no tagging relatives by name.",
    points: [
      "Runs in the background after each upload.",
      "Covers every function of the wedding.",
      "No names, lists or tags to keep up to date.",
    ],
  },
  {
    key: "share",
    title: "Share the wedding QR code and link",
    subtitle: "Put the QR code where guests will see it, and send the link to the family groups.",
    points: [
      "Print it on the welcome board or table cards.",
      "Add it to the e-invite.",
      "Post the link in the family WhatsApp group.",
    ],
  },
  {
    key: "selfie",
    title: "Guests find themselves with a selfie",
    subtitle: "Every guest — from cousins to grandparents — finds their wedding photos in seconds.",
    points: ["One selfie searches every function.", "No app or login to set up.", "View and download on their phone."],
  },
];

export default function WeddingPage() {
  return (
    <PhotoPool {...eventSamples[PATH]}>
      {/* Section 1: Hero */}
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Use cases", path: "/use-cases" },
              { name: "Wedding", path: PATH },
            ]}
          />
        }
        title="World’s Best Wedding Photo Sharing App with AI Face Search"
        subtitle="Upload wedding photos once and let guests find their photos in a second using AI face recognition — just by uploading a selfie. No waiting, no manual searching."
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated={updatedOf(PATH)} />}
        visual={
          <EventPhotoHero
            photo="wedding-guest-phone"
            alt="Wedding guest in a red sari taking a photo with her phone"
            chips={[
              {
                Icon: ScanFace,
                title: "Found in every function",
                sub: "Haldi to Reception",
              },
              {
                Icon: Users,
                title: "One link for the family",
                sub: "Every relative, their own photos",
              },
            ]}
            qrLabel="Welcome board QR"
            align="left"
          />
        }
      />

      <UseCaseLead
        title="Wedding photo sharing with Snapdaps, in short"
        summary="Snapdaps turns the whole wedding — Haldi, Mehndi, Sangeet, Pheras and Reception — into one AI photo gallery. The photographer uploads each function into its folder, and guests scan the QR code on the welcome board or open the link in the family group. One selfie finds them across every function."
        takeaways={[
          "A folder for each function, one gallery for the wedding.",
          "Relatives of every age get photos without an app or login.",
          "Guests see only their own photos — family candids stay private.",
          "Relatives abroad get theirs too: the link opens anywhere.",
        ]}
        bestFor={["Couples and families", "Wedding photographers", "Wedding planners"]}
        scene={
          // Lottie: a guest scanning the QR code (public/animations/CREDITS.md); the chips make it this wedding.
          <div className="relative">
            <LottieScene src="/animations/scan-qr-code.json" className="mx-auto max-w-md" />
            <span className="chip-float surface absolute left-0 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium sm:left-2">
              <span aria-hidden="true">💍</span> Haldi · Sangeet · Reception
            </span>
            <span className="chip-float chip-float-late surface absolute bottom-4 right-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium sm:right-2">
              <span aria-hidden="true" className="flex size-4 items-center justify-center rounded-full bg-after text-[10px] text-after-ink">
                ✓
              </span>
              Your photos are ready
            </span>
          </div>
        }
        sceneCaption="Guests scan the welcome board QR code, take a selfie, and their wedding photos arrive on their phone."
        tone="default"
      />

      <LogoCloud />

      {/* Section 2: Story */}
      <Story
        id="story"
        tone="problem"
        title="The wedding is over… but the newly-wed couple is still waiting for their photos"
        subtitle="The celebrations are over, but everyone is still asking for photos — while the couple has nothing to share yet."
        visual={
          <ChatMock
            title="Wedding family group"
            messages={[
              "Send us the wedding photos!",
              "Did you get our family pictures?",
              "मेरा फोटो भेजना…",
              "हल्दी और संगीत की फ़ोटो कहाँ हैं?",
            ]}
          />
        }
        narrative={
          <>
            <p>The wedding was beautiful and memorable.</p>
            <p>
              The dance performances.
              <br />
              The laughter.
              <br />
              The family moments.
              <br />
              The tears.
              <br />
              The thousands of memories captured in photos.
            </p>
            <p>Now the couple is finally back home. Still overwhelmed. Still reliving every moment.</p>
            <p>And then the calls and messages begin…</p>
            <p className="space-y-2">
              <span className="quote">“Send us the wedding photos!”</span>
              <span className="quote">“Did you get our family pictures?”</span>
              <span className="quote">“Mera photo bhejna…”</span>
              <span className="quote">“Where are the Haldi and Sangeet pictures?”</span>
            </p>
            <p className="italic">
              Friends want photos. Relatives want memories. Everyone wants to relive the wedding.
            </p>
            <p className="italic">
              But there’s one problem. The couple still doesn’t have their photos — because they’re still waiting for
              delivery.
            </p>
            <p className="italic">
              Days turn into weeks. The excitement slowly fades. And the moments everyone was excited to share… stay
              stuck in the photographer’s hard drive.
            </p>
          </>
        }
        waiting={{ title: "Wedding photos", steps: ["Wedding done", "Photographer editing", "Album and pendrive", "Photos with the family"], waiting: "The couple and family are still waiting" }}
        powerLine="A wedding lasts a day. Memories should last forever — not wait."
        close={
          <p>
            A wedding is one of the biggest moments in life. The memories deserve to be shared instantly — not searched
            for weeks later.
          </p>
        }
      />

      <QuestionSection
        id="how-it-works"
        question="How do you share wedding photos with guests?"
        answer="Ask your photographer to upload the wedding to Snapdaps, with a folder for each function. Then share one QR code and link — on the welcome board, in the e-invite or in the family WhatsApp group. Each guest uploads a selfie and sees every photo they appear in, from Haldi to Reception, ready to download."
      >
        <WorkflowSteps steps={weddingSteps} />
      </QuestionSection>

      <Section
        id="features"
        tone="panel"
        title="Everything you need to share wedding photos"
        intro={
          <p>Snapdaps turns the wedding album into an AI photo gallery that every guest can search with a selfie.</p>
        }
      >
        <FeatureBento
          items={[
            {
              key: "face-search",
              title: "Every function, one selfie",
              body: "Guests upload one selfie and see themselves in the Haldi, Sangeet and Reception photos together — no scrolling through the full wedding album.",
            },
            {
              key: "gallery",
              title: "A wedding gallery organised by function",
              body: "A folder for each ceremony keeps thousands of wedding photos easy to browse.",
            },
            {
              key: "upload",
              title: "Upload the whole wedding",
              body: "Bulk upload thousands of photos from a computer or Google Drive, function by function.",
            },
            {
              key: "share",
              title: "One QR code for the whole wedding",
              body: "On the welcome board, the invite or the family WhatsApp group — every copy opens the same gallery.",
            },
            {
              key: "mobile",
              title: "Made for relatives on phones",
              body: "Guests view and download their photos in their phone’s browser. No app, no login.",
            },
            {
              key: "privacy",
              title: "Family moments stay with family",
              body: "Each guest sees only the photos they’re in, so the candid Haldi shots aren’t on show to everyone.",
            },
          ]}
        />
      </Section>

      <QuestionSection
        id="wedding-qr-code"
        question="Can wedding guests find their photos with a QR code?"
        answer="Yes. Every wedding in Snapdaps has its own QR code. Guests scan it at the venue or from the invite, upload a selfie, and their photos from every function appear on their phone. There’s no app to download, which matters at Indian weddings, where the guest list runs from teenagers to grandparents."
      >
        <InfoCards
          items={[
            {
              Icon: Signpost,
              title: "On the welcome board",
              body: "The first thing guests see at the venue — scanned while they wait for the baraat.",
            },
            {
              Icon: Mail,
              title: "In the wedding invitation",
              body: "Printed or digital, so guests have the code before the first function starts.",
            },
            {
              Icon: Gift,
              title: "On table and return-gift cards",
              body: "A last reminder as guests leave, so nobody goes home without their photos.",
            },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="family-abroad"
        tone="panel"
        question="What’s the best way to share wedding photos with family abroad?"
        answer="Send them the wedding link. It opens in any browser, anywhere, so relatives in Dubai, London or Toronto can upload a selfie and download their photos the same way guests at the venue do — no pendrive to courier, no Drive folder to request access to and no huge files sent over WhatsApp."
      >
        <ComparisonRows
          rows={[
            {
              before: "A pendrive couriered overseas",
              after: "One link that opens anywhere",
            },
            {
              before: "Photos forwarded in group chats, batch by batch",
              after: "Each relative downloads their own photos",
            },
            {
              before: "Asking someone back home to find your photos",
              after: "A selfie finds them for you",
            },
          ]}
        />
      </QuestionSection>

      <LeadCapture
        title="Planning a wedding? Set up its photo sharing with us"
        body="Whether you’re the couple, the family or the photographer, we’ll show you how guests will get their wedding photos — and help set up the event before the first function."
        points={[
          "See the guest experience on your phone",
          "Folders for every function, set up together",
          "A reply within one working day",
        ]}
        event="Wedding"
        role="Couple or host"
        submitLabel="Book my wedding demo"
        tone="default"
      />

      <Faq items={faqs[PATH]} title="Wedding photo sharing questions" tone="panel" />

      <CtaBand title="Give every wedding guest their photos instantly" body="Upload once. Let AI do the rest." />
    </PhotoPool>
  );
}
