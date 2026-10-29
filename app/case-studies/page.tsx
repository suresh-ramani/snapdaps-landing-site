import { CtaBand } from "@/components/blocks/cta-band";
import { Section } from "@/components/blocks/section";
import { isIndexed } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* CASE STUDIES — in the site structure, no content yet. noindex until real case studies are added. */

export const metadata = buildMetadata({
  title: "Case studies",
  description: "How photographers and event planners deliver photos faster with Snapdaps AI face search.",
  path: "/case-studies",
  noindex: !isIndexed("/case-studies"),
});

export default function CaseStudiesPage() {
  return (
    <>
      <Section
        as="h1"
        title="Case studies"
        intro={<p>Real stories from photographers and event planners using Snapdaps are on their way.</p>}
      >
        <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
          <p className="font-display text-xl font-semibold">No case studies published yet</p>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Using Snapdaps at your events? Tell us how it went and we may feature your story here.
          </p>
          <a href="/contact" className="mt-6 inline-block font-medium text-primary hover:underline">
            Share your story
          </a>
        </div>
      </Section>
      <CtaBand title="Start delivering photos the smart way" body="Upload once. Let AI do the rest." />
    </>
  );
}
