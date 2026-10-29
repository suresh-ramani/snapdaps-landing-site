import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { CtaBand } from "@/components/blocks/cta-band";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { Hero } from "@/components/blocks/hero";
import { WorkflowSteps } from "@/components/blocks/how-it-works";
import { PowerLine, Section } from "@/components/blocks/section";
import { Story } from "@/components/blocks/story";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { ChatMock } from "@/components/mock/screens";
import { FaceMatchCard, SelfieSearchCard } from "@/components/product/cards";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   USE CASE · PHOTOGRAPHERS — Website_Content_v2_1.docx
   Primary keyword: photo sharing app for photographers
   Also: wedding photo sharing app, face recognition photo sharing, how to share photos
   with clients, best way to deliver photos to clients, photo gallery for clients.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/photo-sharing-app-for-photographers";

export const metadata = buildMetadata({
  absoluteTitle: "Photo Sharing App for Photographers with AI Face Search | Snapdaps",
  description:
    "Deliver client photos instantly with AI face search. No Google Drive links or Pendrive hassle. Built for photographers, weddings, and events.",
  path: PATH,
});

export default function PhotographersPage() {
  return (
    <>
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
            messages={["Hey, send me the wedding photos!", "Mera photo bhejo na…", "Did you get our group pictures?"]}
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
              But your client doesn’t have anything to share yet — because the photographer hasn’t delivered the
              photos.
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
            <p>When your clients don’t get their photos on time, it doesn’t just delay delivery — it affects their experience.</p>
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
          <div className="surface-soft grid grid-cols-[1fr_1.2fr] items-start gap-3 p-6 md:p-8">
            <SelfieSearchCard className="mt-8" />
            <FaceMatchCard />
          </div>
        }
        narrative={
          <>
            <p>Now imagine a different experience.</p>
            <p>
              The event just got over. Instead of waiting a month… your client opens the event link you shared.
            </p>
            <p>
              They upload a simple selfie. And within seconds, all their photos appear automatically by{" "}
              <strong>AI face recognition</strong>.
            </p>
            <p className="font-semibold text-foreground">No searching. No asking. No waiting.</p>
            <p>
              Now when friends and relatives call — <strong className="text-foreground">“Send photos!”</strong> — your client
              simply shares them instantly.
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

      {/* Section 5: Features */}
      <Section
        id="features"
        tone="panel"
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

      {/* Section 6: CTA */}
      <CtaBand
        title="Ready to simplify your workflow and give your customers this AI experience?"
        primaryLabel="Try Snapdaps now"
        trustLine={["No credit card required", "Setup in minutes", "Built for photographers"]}
      />
    </>
  );
}
