import Link from "next/link";
import { ArrowUpRight, Camera, Download, Lock, QrCode, ScanFace, Send } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { CtaBand } from "@/components/blocks/cta-band";
import { Faq } from "@/components/blocks/faq";
import { Hero } from "@/components/blocks/hero";
import { InfoCards } from "@/components/blocks/info-cards";
import { PageByline } from "@/components/blocks/page-byline";
import { QuestionSection } from "@/components/blocks/question-section";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { LottieScene } from "@/components/motion/lottie-scene";
import { FaceMatchCard, SelfieSearchCard } from "@/components/product/cards";
import { faqs } from "@/content/faqs";
import { isIndexed } from "@/content/routes";
import { useCaseNav } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   FEATURE · AI FACE SEARCH
   Draft copy by Claude — not from the content doc; reviewed by: pending. noindex until the
   team approves it (content/routes.ts → indexed: true).
   Primary: face recognition photo sharing. Also: find my photos with a selfie, face search
   for event photos. ("AI photo gallery" stays on home / how it works / photographers / wedding.)
------------------------------------------------------------------------------------ */

const PATH = "/features/ai-face-search";
const TITLE = "AI Face Search for Event Photos: Find Yours With a Selfie | Snapdaps";
const DESCRIPTION =
  "Guests upload one selfie and Snapdaps face recognition finds every event photo they appear in — across all folders, in seconds, with no app or login.";

export const metadata = buildMetadata({
  absoluteTitle: TITLE,
  description: DESCRIPTION,
  path: PATH,
  noindex: !isIndexed(PATH),
});

export default function AiFaceSearchPage() {
  return (
    <>
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Features", path: "/features" },
              { name: "AI face search", path: PATH },
            ]}
          />
        }
        title="AI Face Search for Event Photos"
        subtitle="Every guest finds their own photos with one selfie."
        body={
          <p>
            No tagging, no photo numbers, no scrolling through thousands of pictures. Guests take a selfie and Snapdaps
            shows every event photo they appear in.
          </p>
        }
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated="2026-10-31" />}
        visual={
          <div aria-hidden="true" data-nosnippet className="mx-auto grid max-w-md grid-cols-1 items-start gap-3 sm:grid-cols-[1fr_1.2fr]">
            <SelfieSearchCard className="sm:mt-10" />
            <FaceMatchCard count={24} />
          </div>
        }
      />

      <UseCaseLead
        title="AI face search, in short"
        summary="Snapdaps AI face search lets every guest find their own event photos with one selfie. When photos are uploaded, faces are detected automatically — nobody tags or names anyone. A guest scans the event QR code or opens the link, takes a selfie and sees every photo they appear in, across all folders, in seconds."
        takeaways={[
          "No tagging or naming — faces are detected on upload.",
          "One selfie searches every folder of the event.",
          "Guests see only the photos they appear in.",
          "Works in the phone’s browser: no app, no login.",
        ]}
        bestFor={["Guests at large events", "Photographers", "Event planners"]}
        scene={<LottieScene src="/animations/face-scan.json" ratio="404 / 472" className="mx-auto max-w-xs" />}
        sceneCaption="One selfie in, the guest’s own photos out — matched across the whole event."
        tone="default"
      />

      <QuestionSection
        id="how-face-recognition-works"
        tone="panel"
        question="How does face recognition photo sharing work?"
        answer="Face recognition photo sharing matches a guest’s selfie to the faces in an event’s photos. Snapdaps detects every face as photos are uploaded. When a guest uploads a selfie, it compares that face with the event and returns only the photos the guest appears in, ready to view and download."
      >
        <InfoCards
          numbered
          items={[
            { title: "The event is uploaded", body: "Thousands of photos, from a computer or Google Drive, into the event’s folders." },
            { title: "Faces are detected", body: "Every face in every photo is found automatically, in the background." },
            { title: "A selfie finds the matches", body: "The guest’s face is compared with the event, and only their photos come back." },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="find-my-photos"
        question="How do I find my photos from an event with a selfie?"
        answer="Open the event link or scan the QR code the photographer or host shared, then take a selfie or upload one. Snapdaps shows every photo you appear in within seconds. Download the ones you want straight to your phone — there’s no app to install and no account to create."
      >
        <InfoCards
          items={[
            { Icon: QrCode, title: "Open the event", body: "Scan the QR code at the venue or tap the link someone sent you." },
            { Icon: Camera, title: "Take a selfie", body: "A clear, front-facing photo works best — no sunglasses." },
            { Icon: Download, title: "Save your photos", body: "View your matches and download them to your phone." },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="is-it-private"
        tone="panel"
        question="Is AI face search private?"
        answer="Each guest sees only the photos their selfie matches, not the whole event, and the event opens only through the link or QR code its host shares. Hosts decide which events and folders exist and who receives the link. For questions about how photos and faces are stored, contact our team."
      >
        <InfoCards
          items={[
            { Icon: ScanFace, title: "Matches only", body: "A selfie returns the photos with that face — never the full album." },
            { Icon: Send, title: "Shared by the host", body: "Guests reach an event only through the link or QR code they were given." },
            {
              Icon: Lock,
              title: "Questions about storage?",
              body: (
                <>
                  <Link href="/contact" className="font-medium text-primary hover:underline">
                    Ask our team
                  </Link>{" "}
                  — we’ll explain how photos and faces are handled.
                </>
              ),
            },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="which-events"
        question="Which events does face search work for?"
        answer="Any event where many people are photographed and everyone wants their own pictures — weddings and their functions, birthday parties, conferences and offsites, award ceremonies and sports tournaments. It works the same way at every size: upload, share one link or QR code, and each guest searches with a selfie."
      >
        <ul className="flex flex-wrap gap-2">
          {useCaseNav.flatMap((g) => g.links).map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-4 py-2 text-sm font-medium ring-1 ring-border transition-colors hover:text-primary"
              >
                {l.label}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </QuestionSection>

      <Faq items={faqs[PATH]} title="Face search questions" tone="panel" />

      <CtaBand title="Let every guest find their photos with a selfie" body="Upload once. Let AI do the rest." />
    </>
  );
}
