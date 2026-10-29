import { CtaBand } from "@/components/blocks/cta-band";
import { WorkflowSteps } from "@/components/blocks/how-it-works";
import { Section } from "@/components/blocks/section";
import { buildMetadata } from "@/lib/seo";

/* HOW IT WORKS — content doc: Home → Section 5 (Heading is H1 on this standalone page). */

export const metadata = buildMetadata({
  title: "How Snapdaps works: upload, AI face search, instant delivery",
  description:
    "Create an event, upload photos, let AI detect faces, share by QR code or link, and guests get their photos with a selfie. See how Snapdaps works in five steps.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <Section
        as="h1"
        title="How Snapdaps works"
        intro={<p>From photo upload to instant photo delivery by AI face search — everything happens automatically.</p>}
      >
        <WorkflowSteps stepHeading="h2" />
        <p className="mt-10 text-center font-display text-2xl font-semibold">
          Your work ends after upload. <span className="text-primary">Snapdaps takes care of the rest.</span>
        </p>
      </Section>
      <CtaBand
        title="Start delivering photos the smart way"
        body="Upload once. Let AI do the rest. Give your customers a faster, smarter, AI-powered face search experience."
      />
    </>
  );
}
