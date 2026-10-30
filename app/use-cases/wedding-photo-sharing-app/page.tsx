import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { CtaBand } from "@/components/blocks/cta-band";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { Hero } from "@/components/blocks/hero";
import { WorkflowSteps } from "@/components/blocks/how-it-works";
import { Section } from "@/components/blocks/section";
import { Story } from "@/components/blocks/story";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { ChatMock } from "@/components/mock/screens";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   USE CASE · WEDDING — Website_Content_v2_1.docx
   Keywords: wedding photo sharing app, wedding photo sharing, wedding picture sharing
   app, wedding photo app for guests, best wedding photo sharing app.

   Doc status: hero, story and CTA buttons written. The CTA heading is blank in the doc,
   and there's no solution / features copy yet — How it works and the features bento
   use the shared copy until wedding-specific copy arrives.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/wedding-photo-sharing-app";

export const metadata = buildMetadata({
  absoluteTitle: "Wedding Photo Sharing App with AI Face Search | Snapdaps",
  description:
    "Share wedding photos by QR Code and secure link with guests. Guests can find their photos in seconds with AI face recognition by uploading a selfie.",
  path: PATH,
});

export default function WeddingPage() {
  return (
    <>
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
            <p>
              Now the couple is finally back home. Still overwhelmed. Still reliving every moment.
            </p>
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
        powerLine="A wedding lasts a day. Memories should last forever — not wait."
        close={
          <p>
            A wedding is one of the biggest moments in life. The memories deserve to be shared instantly — not searched
            for weeks later.
          </p>
        }
      />

      {/* Shared until wedding-specific copy arrives (TODO) */}
      <Section
        id="how-it-works"
        title="How Snapdaps works for weddings"
        intro={<p>From photo upload to instant photo delivery by AI face search — everything happens automatically.</p>}
      >
        <WorkflowSteps />
      </Section>

      <Section id="features" tone="panel" title="Everything you need to share wedding photos">
        <FeatureBento />
      </Section>

      {/* Section 4: CTA — TODO: the doc leaves this heading blank; replace when it's written. */}
      <CtaBand
        title="Give every wedding guest their photos instantly"
        body="Upload once. Let AI do the rest."
      />
    </>
  );
}
