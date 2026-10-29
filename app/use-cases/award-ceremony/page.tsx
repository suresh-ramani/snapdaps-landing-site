import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { CtaBand } from "@/components/blocks/cta-band";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { Hero } from "@/components/blocks/hero";
import { WorkflowSteps } from "@/components/blocks/how-it-works";
import { Section } from "@/components/blocks/section";
import { isIndexed } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   USE CASE · AWARD CEREMONY — DRAFT
   Not in Website_Content_v2_1.docx yet. The layout is final; the copy below is a
   placeholder. The page is noindex and out of the sitemap until `indexed: true` is set
   for "/use-cases/award-ceremony" in content/routes.ts.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/award-ceremony";

export const metadata = buildMetadata({
  title: "Award Ceremony Photo Sharing with AI Face Search", // TODO: meta title from content doc
  description: "Placeholder: meta description for award ceremony (150–160 characters).", // TODO
  path: PATH,
  noindex: !isIndexed(PATH),
});

export default function AwardCeremonyPage() {
  return (
    <>
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Use cases", path: "/use-cases" },
              { name: "Award ceremony", path: PATH },
            ]}
          />
        }
        title="Award Ceremony Photo Sharing with AI Face Search"
        subtitle="Winners and guests find their stage moments in seconds."
        body={<p>Placeholder: one or two lines from the content doc.</p>}
      />

      {/* TODO: story / problem section from the content doc */}

      <Section
        id="how-it-works"
        title="How Snapdaps works"
        intro={<p>From photo upload to instant photo delivery by AI face search — everything happens automatically.</p>}
      >
        <WorkflowSteps />
      </Section>

      <Section id="features" tone="panel" title="Everything you need for award ceremony photo sharing">
        <FeatureBento />
      </Section>

      <CtaBand title="Placeholder: closing line for award ceremony" body="Upload once. Let AI do the rest." />
    </>
  );
}
