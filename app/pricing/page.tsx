import { CtaBand } from "@/components/blocks/cta-band";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { PricingTable } from "@/components/blocks/pricing-table";
import { Section } from "@/components/blocks/section";
import { StatsBand } from "@/components/blocks/stats-band";
import { buildMetadata } from "@/lib/seo";

/* PRICING — TODO: plans in content/site.ts are placeholders; pricing isn't in the content doc yet. */

export const metadata = buildMetadata({
  title: "Pricing",
  description: "Snapdaps plans and pricing for photographers, event planners and studios. Start with a free trial.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <Section
        as="h1"
        align="center"
        title="Simple pricing for every event"
        intro={<p>Placeholder: one line on how plans and billing work.</p>}
      >
        <PricingTable />
      </Section>
      <StatsBand className="pt-0" />
      <LogoCloud className="pt-0" />
      <CtaBand title="Start delivering photos the smart way" body="Upload once. Let AI do the rest." />
    </>
  );
}
