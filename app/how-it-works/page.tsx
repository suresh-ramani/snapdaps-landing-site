import Link from "next/link";
import { Check, Images, Link2, Lock, Mail, QrCode, ScanFace, Smartphone, UserRound, X } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { CtaBand } from "@/components/blocks/cta-band";
import { Faq } from "@/components/blocks/faq";
import { WorkflowSteps } from "@/components/blocks/how-it-works";
import { InfoCards } from "@/components/blocks/info-cards";
import { PageByline } from "@/components/blocks/page-byline";
import { QuestionSection } from "@/components/blocks/question-section";
import { Section } from "@/components/blocks/section";
import { JsonLd } from "@/components/json-ld";
import { WhatsAppLogo } from "@/components/mock/brand-icons";
import { FaceMatchCard, PrivacyCard, SelfieSearchCard } from "@/components/product/cards";
import { faqs } from "@/content/faqs";
import { workflowSteps } from "@/content/site";
import { buildMetadata, howToLd } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   HOW IT WORKS — H1, the 5 steps and the CTA from the content doc (Home → Section 5).
   Lead answer, question sections and FAQ: draft copy by Claude — not from the content doc;
   reviewed by: (pending).
   Primary: how AI face search photo sharing works.
   Also: AI photo gallery, how to share event photos with guests, find photos with a selfie,
   QR code photo sharing.
------------------------------------------------------------------------------------ */

const PATH = "/how-it-works";
const TITLE = "How Snapdaps works: upload, AI face search, instant delivery";
const DESCRIPTION =
  "Create an event, upload photos, let AI detect faces, share by QR code or link, and guests get their photos with a selfie. See how Snapdaps works in five steps.";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function HowItWorksPage() {
  return (
    <>
      <Section
        as="h1"
        title="How Snapdaps works"
        above={<Breadcrumbs items={[{ name: "How it works", path: PATH }]} />}
        intro={
          <>
            <p>
              Snapdaps turns your event photos into an AI photo gallery. You create an event, upload the photos and
              Snapdaps detects every face automatically. Then you share one link or QR code, and each guest uploads a
              selfie to see only the photos they appear in — on their phone, in seconds, with no app or login.
            </p>
            <PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated="2026-10-30" className="pt-2" />
          </>
        }
      >
        <WorkflowSteps stepHeading="h2" />
        <p className="mt-10 text-center font-display text-2xl font-semibold">
          Your work ends after upload. <span className="text-primary">Snapdaps takes care of the rest.</span>
        </p>
      </Section>

      <QuestionSection
        id="face-search"
        tone="panel"
        question="How does AI face search find a guest’s photos?"
        answer="When photos are uploaded, Snapdaps scans them in the background and detects the faces in each one — nobody tags anything. A guest then uploads a selfie, and AI face search matches that face against the event’s photos and shows every photo the guest appears in, across all folders, within seconds."
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <InfoCards
            numbered
            className="lg:grid-cols-1"
            items={[
              {
                title: "Faces are found on upload",
                body: "Each photo is scanned as it arrives, in every folder of the event. You keep uploading; detection runs on its own.",
              },
              {
                title: "The guest’s selfie is the search",
                body: "No names, tags or photo numbers. The selfie is all a guest needs to start looking.",
              },
              {
                title: "Matches appear in one gallery",
                body: "Every photo with the guest’s face shows up together, ready to view and download.",
              },
            ]}
          />
          <div aria-hidden="true" data-nosnippet className="surface-soft grid grid-cols-1 items-start gap-3 p-6 sm:grid-cols-[1fr_1.2fr] md:p-8">
            <SelfieSearchCard className="sm:mt-8" />
            <FaceMatchCard count={24} />
          </div>
        </div>
      </QuestionSection>

      <QuestionSection
        id="guest-needs"
        question="What does a guest need to get their photos?"
        answer="Just a phone with a browser and a selfie. Guests open the event link or scan the QR code, take or upload a selfie, and their photos appear. There is no app to install, no account to create and no password to remember, so it works for every guest, not only the tech-savvy ones."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="surface p-6">
            <h3 className="text-lg font-semibold tracking-tight">What a guest needs</h3>
            <ul className="mt-4 space-y-3 text-[15px]">
              {[
                { Icon: Smartphone, text: "A phone with a web browser" },
                { Icon: QrCode, text: "The event’s link or QR code" },
                { Icon: UserRound, text: "One selfie" },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-lg bg-after text-after-ink">
                    <Icon className="size-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface p-6">
            <h3 className="text-lg font-semibold tracking-tight">What a guest doesn’t need</h3>
            <ul className="mt-4 space-y-3 text-[15px] text-muted-foreground">
              {["An app to install", "An account or password", "To scroll through every photo of the event"].map((text) => (
                <li key={text} className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-lg bg-before text-before-ink">
                    <X className="size-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </QuestionSection>

      <QuestionSection
        id="share"
        tone="panel"
        question="How do you share an event with guests?"
        answer="Every event gets one secure web link and its own QR code. Print the QR code on a welcome board or table card, add it to the invitation, show it on a screen, or send the link to guests on WhatsApp. Whichever way guests open it, they land in the same event gallery."
      >
        <InfoCards
          items={[
            {
              Icon: QrCode,
              title: "QR code at the venue",
              body: "Guests scan it with their phone camera during or after the event — on a standee, a table card or the screen.",
            },
            {
              Icon: Link2,
              title: "A secure web link",
              body: "Paste it into an email, an invitation or a message. It opens the event in any browser.",
            },
            {
              Icon: Mail,
              title: "In the invitation",
              body: "Add the QR code to printed or digital invites, so guests already have it when they arrive.",
            },
          ]}
        />
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <WhatsAppLogo className="size-4" />
          Or invite guests on WhatsApp — drop the link in the family or team group.
        </p>
      </QuestionSection>

      <QuestionSection
        id="privacy"
        question="What happens to the photos and faces?"
        answer="Photos stay inside the event you create, and the event opens only through the link or QR code you share. Face search shows each guest only the photos they appear in, so nobody browses other guests’ pictures. You decide which events and folders exist, and who receives the link."
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <ul className="space-y-4 text-[15px]">
            {[
              { Icon: Lock, text: "Each event is reached only through its own link or QR code." },
              { Icon: ScanFace, text: "A guest’s selfie returns only the photos with their face." },
              { Icon: Images, text: "You organise photos into the events and folders you choose." },
            ].map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span aria-hidden="true" className="icon-tile size-8">
                  <Icon className="size-4" />
                </span>
                <span className="pt-1">{text}</span>
              </li>
            ))}
            <li className="flex items-start gap-3 text-muted-foreground">
              <Check className="mt-1 size-4 shrink-0 text-after-ink" aria-hidden="true" />
              <span>
                Questions about how photos are stored?{" "}
                <Link href="/contact" className="font-medium text-primary hover:underline">
                  Ask our team
                </Link>
                .
              </span>
            </li>
          </ul>
          <div aria-hidden="true" data-nosnippet>
            <PrivacyCard className="mx-auto max-w-md" />
          </div>
        </div>
      </QuestionSection>

      <Faq items={faqs[PATH]} title="Questions about how Snapdaps works" />

      <CtaBand
        title="Start delivering photos the smart way"
        body="Upload once. Let AI do the rest. Give your customers a faster, smarter, AI-powered face search experience."
      />

      <JsonLd
        data={howToLd({
          name: "How to share event photos with guests using AI face search",
          description: "Five steps from creating an event to every guest finding their photos with a selfie.",
          path: PATH,
          steps: workflowSteps.map((s) => ({ name: s.title, text: s.subtitle })),
        })}
      />
    </>
  );
}
