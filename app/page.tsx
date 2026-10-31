import { Images, PhoneMissed, QrCode, Smile, Sparkles, Usb } from "lucide-react";
import { Suspense } from "react";
import { ComparisonRows } from "@/components/blocks/comparison-rows";
import { DeliveryComparison } from "@/components/blocks/delivery-comparison";
import { PricingTeaser } from "@/components/blocks/pricing-teaser";
import { QuestionSection } from "@/components/blocks/question-section";
import { PageByline } from "@/components/blocks/page-byline";
import { CtaBand, MiniCta } from "@/components/blocks/cta-band";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { Hero } from "@/components/blocks/hero";
import { WorkflowSteps } from "@/components/blocks/how-it-works";
import { LatestPosts } from "@/components/blocks/latest-posts";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { ChatMarquee } from "@/components/blocks/chat-marquee";
import { PainPoints, type PainPoint } from "@/components/blocks/pain-points";
import { Faq } from "@/components/blocks/faq";
import { Section } from "@/components/blocks/section";
import { SocialProof } from "@/components/blocks/social-proof";
import { SolutionFlow } from "@/components/blocks/solution-flow";
import { TurningPoint } from "@/components/blocks/turning-point";
import { TypingWords } from "@/components/blocks/typing-words";
import { AnnouncementPill, showsHeroPill } from "@/components/layout/announcement-bar";
import { JsonLd } from "@/components/json-ld";
import { faqs } from "@/content/faqs";
import { updatedOf } from "@/content/routes";
import { site } from "@/content/site";
import { getPlans } from "@/lib/plans";
import { formatPrice } from "@/lib/plans";
import { buildMetadata, schemaIds, softwareLd } from "@/lib/seo";
import { getAnnouncement } from "@/lib/wp/api";

/* ------------------------------------------------------------------------------------
   HOME — content from Website_Content_v2_1.docx (Home). Edit copy directly in this file.
   Target keywords (India): AI face recognition, AI face search, AI photo gallery,
   photo sharing for photographers, event photo sharing.
------------------------------------------------------------------------------------ */

// One intent with the H1 (photo sharing app for photographers, and the events they shoot); no "Best".
const TITLE = "AI Photo Sharing App for Photographers & Events | Snapdaps";
const DESCRIPTION =
  "Upload event photos once. Guests scan a QR code or open a link, take a selfie, and AI face search shows only their photos — no app, no login. Start free.";
/** Bump `updated` for "/" in content/routes.ts when the home page's copy changes. */
const UPDATED = updatedOf("/");

export const metadata = buildMetadata({ absoluteTitle: TITLE, description: DESCRIPTION, path: "/" });

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

export default async function HomePage() {
  // Same cached request as the bar in the layout (React cache + data cache), resolved before the hero
  // renders, so the pill never pops in and shifts the headline.
  // Plans: real prices for the SoftwareApplication offers (same cached request as /pricing).
  const [announcement, plans] = await Promise.all([getAnnouncement(), getPlans()]);
  const offers = (plans ?? []).filter((p) => p.monthly).map((p) => ({ name: `${p.name} (monthly)`, price: p.monthly!.price }));
  // Cheapest paid monthly price for the pricing teaser (live from the plans API; omitted if it's down).
  const cheapest = (plans ?? []).filter((p) => !p.free && p.monthly?.price).sort((a, b) => a.monthly!.price - b.monthly!.price)[0];
  const fromPrice = cheapest ? formatPrice(cheapest.monthly!.price, cheapest.currency) : undefined;
  const trialDays = cheapest?.trialDays || site.trialDays;
  return (
    <>
      {/* Section 1: Hero */}
      <Hero
        layout="center"
        // Launch / offer pill from WordPress → Settings → Announcement ("home hero" ticked, Style: Launch or Offer).
        above={showsHeroPill(announcement) ? <AnnouncementPill announcement={announcement} /> : undefined}
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
            { text: "भैया, शादी की फ़ोटो कब तक मिलेंगी?", from: "Sunita", time: "9:58 pm" },
            { text: "Hey, send me the wedding photos!", from: "Priya", time: "10:02 pm" },
            { text: "Did you get our group pictures?", from: "Kabir", time: "8:15 am" },
            { text: "मेरा फोटो भेजो ना…", from: "Neha", time: "11:30 am" },
            { text: "Where are the Haldi and Sangeet pictures?", from: "Aunty ji", time: "1:12 pm" },
            { text: "हल्दी वाली फ़ोटो भेज दो 🙏", from: "Dadi", time: "4:20 pm" },
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
        // Short brand heading; the descriptor ("smart AI-powered photo sharing and AI face search platform")
        // opens the intro, so the keywords stay without a keyword-heavy H2.
        title="Meet Snapdaps"
        intro={
          <p>
            The smart, AI-powered photo sharing and AI face search platform. Upload photos once. Let AI automatically
            organise and deliver them to the right people instantly. No manual searching — just instant photo
            discovery by AI face recognition.
          </p>
        }
      >
        <p className="mx-auto -mt-6 mb-14 max-w-2xl text-center text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
          <span className="text-brand-gradient">
            Your customers find their photos in seconds — just by uploading a selfie.
          </span>
        </p>

        <SolutionFlow />

        {/* The quotable "Snapdaps is…" answer for search and AI engines (content/site.ts → definition). */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h3 className="text-xl font-semibold tracking-tight md:text-2xl">What is Snapdaps?</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{site.definition}</p>
          {/* Who wrote it and when (E-E-A-T) + the home WebPage schema. */}
          <PageByline
            name={TITLE}
            description={DESCRIPTION}
            path="/"
            updated={UPDATED}
            about={schemaIds.software()}
            className="mt-4"
          />
        </div>

        <h3 className="mb-6 mt-20 text-center text-2xl font-semibold tracking-tight md:text-3xl">
          What changes in your workflow
        </h3>
        <ComparisonRows
          className="mx-auto max-w-4xl"
          beforeLabel="Before Snapdaps"
          rows={[
            { before: "Manually sorting thousands of photos", after: "Upload once — AI does the sorting", beforeIcon: Images, afterIcon: Sparkles },
            { before: "Copying photos for every client, one by one", after: "One upload serves the whole event", beforeIcon: Usb, afterIcon: QrCode },
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
        title="How does Snapdaps work?"
        intro={<p>From photo upload to instant photo delivery by AI face search — everything happens automatically.</p>}
      >
        <WorkflowSteps />
      </Section>

      {/* Comparison + what it costs: question-led (AEO) — a real table, then the live pricing answer. */}
      <QuestionSection
        id="compare"
        question="How does Snapdaps compare with a Google Drive link, a pendrive or WhatsApp?"
        answer="A Google Drive link, a pendrive or a WhatsApp group gives guests the whole set of photos, or only the ones someone forwards. Snapdaps gives each guest just the photos they appear in: they open one link or scan a QR code, take a selfie, and AI face search finds them — no app, no account."
      >
        <DeliveryComparison />
        <PricingTeaser fromPrice={fromPrice} trialDays={trialDays} className="mt-8" />
      </QuestionSection>

      {/* Latest blog posts (WordPress, streamed) */}
      <Suspense fallback={null}>
        <LatestPosts />
      </Suspense>

      {/* FAQ (content/faqs.ts); <Faq> also emits FAQPage schema */}
      <Faq items={faqs["/"]} />

      {/* Section 6: CTA */}
      <CtaBand
        title="Start delivering photos the smart way"
        body="Upload once. Let AI do the rest. Give your customers a faster, smarter, AI-powered face search experience."
        primaryLabel="Sign up free"
        secondaryLabel="Request a demo"
      />

      <JsonLd data={softwareLd(offers)} />
    </>
  );
}
