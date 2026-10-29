import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { CtaBand } from "@/components/blocks/cta-band";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { Hero } from "@/components/blocks/hero";
import { WorkflowSteps } from "@/components/blocks/how-it-works";
import { Section } from "@/components/blocks/section";
import { isIndexed } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   USE CASE · BIRTHDAY PARTY — DRAFT
   Not in Website_Content_v2_1.docx yet. The layout is final; the copy below is a
   placeholder. The page is noindex and out of the sitemap until `indexed: true` is set
   for "/use-cases/birthday-party" in content/routes.ts.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/birthday-party";

export const metadata = buildMetadata({
  title: "Birthday Party Photo Sharing App with AI Face Search", // TODO: meta title from content doc
  description: "Placeholder: meta description for birthday party (150–160 characters).", // TODO
  path: PATH,
  noindex: !isIndexed(PATH),
});

export default function BirthdayPartyPage() {
  return (
    <>
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Use cases", path: "/use-cases" },
              { name: "Birthday party", path: PATH },
            ]}
          />
        }
        title="Birthday Party Photo Sharing App with AI Face Search"
        subtitle="Every guest gets their party photos the same day — just by uploading a selfie."
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

      <Section id="features" tone="panel" title="Everything you need for birthday party photo sharing">
        <FeatureBento />
      </Section>

      <CtaBand title="Placeholder: closing line for birthday party" body="Upload once. Let AI do the rest." />
    </>
  );
}
