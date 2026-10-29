import { Images, PhoneMissed, QrCode, ScanFace, SearchX, Smile, Sparkles, Usb } from "lucide-react";
import { Suspense } from "react";
import { ComparisonRows } from "@/components/blocks/comparison-rows";
import { CtaBand, MiniCta } from "@/components/blocks/cta-band";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { Hero } from "@/components/blocks/hero";
import { WorkflowSteps } from "@/components/blocks/how-it-works";
import { LatestPosts } from "@/components/blocks/latest-posts";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { ChatMarquee } from "@/components/blocks/chat-marquee";
import { PainPoints, type PainPoint } from "@/components/blocks/pain-points";
import { Section } from "@/components/blocks/section";
import { SocialProof } from "@/components/blocks/social-proof";
import { SolutionFlow } from "@/components/blocks/solution-flow";
import { TurningPoint } from "@/components/blocks/turning-point";
import { TypingWords } from "@/components/blocks/typing-words";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, softwareLd } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   HOME — content from Website_Content_v2_1.docx (Home). Edit copy directly in this file.
   Target keywords (India): AI face recognition, AI face search, AI photo gallery,
   photo sharing for photographers, event photo sharing.
------------------------------------------------------------------------------------ */

export const metadata = buildMetadata({
  absoluteTitle: "Best AI Photo Sharing & Face Search for Events | Snapdaps",
  description:
    "Upload event photos once and let AI do the rest. Find photos quickly using AI face recognition. Perfect for photographers and event planners. Start Free Trial!",
  path: "/",
});

const painPoints: PainPoint[] = [
  {
    kind: "search",
    title: "Finding photos is frustrating",
    body: "Customers scroll through thousands of images just to find a few photos of themselves.",
  },
  {
    kind: "calls",
    title: "Endless follow-ups",
    body: "You keep getting calls and messages asking, “Sir, mera photo mila?”",
  },
  {
    kind: "pendrive",
    title: "Pendrive delivery is inconvenient",
    body: "Customers are busy, delayed, or ask for home delivery after the event.",
  },
  {
    kind: "drive",
    title: "Unprofessional delivery methods",
    body: "Sharing via Drive links or a pendrive doesn’t match your premium work.",
  },
  {
    kind: "referrals",
    title: "Poor experience hurts referrals",
    body: "Delayed delivery = unhappy clients = fewer referrals.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero */}
      <Hero
        layout="center"
        // Server HTML (what Google indexes) reads "Photo Sharing App for Photographers with AI Face
        // Search"; after load the middle line types through the other audiences.
        titleLabel="Photo Sharing App for Photographers with AI Face Search"
        title={
          <>
            Photo Sharing App for{" "}
            {/* Own line, with room for two lines on phones, so the heading never jumps. */}
            <span className="flex min-h-[2.1em] items-center justify-center sm:block sm:min-h-0 sm:whitespace-nowrap">
              <TypingWords
                words={[
                  { text: "Photographers", emoji: "📸" },
                  { text: "Studios", emoji: "🎞️" },
                  { text: "Wedding Photographers", emoji: "💍" },
                  { text: "Event Planners", emoji: "🎉" },
                ]}
              />
            </span>{" "}
            with AI Face Search
          </>
        }
        subtitle="Upload once. Let AI do the rest."
        body={
          <p>
            Deliver thousands of event photos instantly. Let your customers find their photos using AI face
            recognition — no more searching, no more pendrive or WhatsApp chaos.
          </p>
        }
      />

      {/* Client logos (content/clients.ts) — scrolling strip, any number of logos */}
      <LogoCloud />

      {/* Section 2: Problem + pain */}
      <Section
        id="problem"
        tone="panel"
        title="Still sharing event photos the old way?"
        intro={
          <p>
            If you’re still using a pendrive, Google Drive, or WhatsApp… you’re wasting hours, frustrating customers,
            and losing referrals. Guests struggle to find their photos in large galleries.
          </p>
        }
      >
        <ChatMarquee
          className="-mt-4 mb-14 md:-mt-6 md:mb-16"
          messages={[
            { text: "Sir, mera photo mila?", from: "Rahul", time: "9:41 pm" },
            { text: "Hey, send me the wedding photos!", from: "Priya", time: "10:02 pm" },
            { text: "Did you get our group pictures?", from: "Kabir", time: "8:15 am" },
            { text: "Mera photo bhejo na…", from: "Neha", time: "11:30 am" },
            { text: "Where are the Haldi and Sangeet pictures?", from: "Aunty ji", time: "1:12 pm" },
            { text: "Send us the wedding photos!", from: "Riya", time: "6:47 pm" },
          ]}
        />
        <PainPoints points={painPoints} />
        <TurningPoint
          lead="You shoot amazing photos. But your delivery process is still outdated."
          body="In today’s AI world, your photo delivery should be just as smart as your photography."
        />
      </Section>

      {/* Section 3: Solution — what Snapdaps does, in one picture, then old way vs. new */}
      <Section
        id="solution"
        align="center"
        glow
        title="Meet Snapdaps — smart AI-powered photo sharing and AI face search platform"
        intro={
          <p>
            Upload photos once. Let AI automatically organise and deliver them to the right people instantly. No
            manual searching — just instant photo discovery by AI face recognition.
          </p>
        }
      >
        <p className="mx-auto -mt-6 mb-14 max-w-2xl text-center text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
          <span className="text-brand-gradient">
            Your customers find their photos in seconds — just by uploading a selfie.
          </span>
        </p>

        <SolutionFlow />

        <h3 className="mb-6 mt-20 text-center text-2xl font-semibold tracking-tight md:text-3xl">
          See how Snapdaps transforms your photo sharing experience
        </h3>
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
        <MiniCta lead="Ready to switch to smarter photo delivery?" />
      </Section>

      {/* Product capabilities (bento) */}
      <Section
        id="features"
        tone="panel"
        title="Everything you need to deliver photos smarter"
        intro={<p>A complete client photo delivery system powered by AI.</p>}
      >
        <FeatureBento />
      </Section>

      {/* Section 4: Social proof */}
      <SocialProof
        title="Trusted by photographers & event professionals"
        intro="Be among the first photographers in India to offer AI-powered photo search to your clients."
        // TODO: add real testimonials: testimonials={[{ quote, name, role, city }]}
      />

      {/* Section 5: How it works */}
      <Section
        id="how-it-works"
        tone="panel"
        title="How Snapdaps works"
        intro={<p>From photo upload to instant photo delivery by AI face search — everything happens automatically.</p>}
      >
        <WorkflowSteps />
      </Section>

      {/* Latest blog posts (WordPress, streamed) */}
      <Suspense fallback={null}>
        <LatestPosts />
      </Suspense>

      {/* Section 6: CTA */}
      <CtaBand
        title="Start delivering photos the smart way"
        body="Upload once. Let AI do the rest. Give your customers a faster, smarter, AI-powered face search experience."
        primaryLabel="Sign up free"
        secondaryLabel="Request a demo"
      />

      <JsonLd data={softwareLd()} />
    </>
  );
}
