import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { ComparisonRows } from "@/components/blocks/comparison-rows";
import { CtaBand } from "@/components/blocks/cta-band";
import { Faq } from "@/components/blocks/faq";
import { Hero } from "@/components/blocks/hero";
import { InfoCards } from "@/components/blocks/info-cards";
import { PageByline } from "@/components/blocks/page-byline";
import { QuestionSection } from "@/components/blocks/question-section";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { LottieScene } from "@/components/motion/lottie-scene";
import { UploadCard } from "@/components/product/cards";
import { faqs } from "@/content/faqs";
import { isIndexed, updatedOf } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   FEATURE · GOOGLE DRIVE IMPORT
   Draft copy by Claude — not from the content doc; reviewed by: pending. noindex until the
   team approves it (content/routes.ts → indexed: true).
   Facts from the team (31 Oct 2026): the photographer pastes a public Google Drive link;
   Snapdaps downloads every image in it, subfolders included, as a background job. No sync,
   size or speed claims until confirmed.
   Primary: import photos from Google Drive. Also: share Google Drive photos with guests.
   (The photographers page keeps its short "Google Drive alternative" comparison.)
------------------------------------------------------------------------------------ */

const PATH = "/features/google-drive-import";
const TITLE = "Google Drive Import: Share Drive Photos With Every Guest | Snapdaps";
const DESCRIPTION =
  "Paste a public Google Drive link and Snapdaps imports every image — subfolders included — in the background. Faces are detected automatically and every guest finds their own photos.";

export const metadata = buildMetadata({
  absoluteTitle: TITLE,
  description: DESCRIPTION,
  path: PATH,
  noindex: !isIndexed(PATH),
});

export default function GoogleDriveImportPage() {
  return (
    <>
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Features", path: "/features" },
              { name: "Google Drive import", path: PATH },
            ]}
          />
        }
        title="Google Drive Import for Event Photos"
        subtitle="Paste a Google Drive link. Snapdaps brings in every photo."
        body={
          <p>
            Your edited photos are already in Drive. Paste the folder’s public link into a Snapdaps event, and the
            whole shoot comes in while you get on with your next one.
          </p>
        }
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated={updatedOf(PATH)} />}
        visual={
          <div aria-hidden="true" data-nosnippet>
            <UploadCard className="mx-auto max-w-sm" />
          </div>
        }
      />

      <UseCaseLead
        title="Google Drive import, in short"
        summary="Keep your shoots in Google Drive? Paste the folder’s public link into a Snapdaps event, and Snapdaps fetches every image — subfolders included — in the background. There’s no downloading to your computer and uploading again. Faces are detected automatically, and guests find their own photos with a selfie."
        takeaways={[
          "Just paste a public Google Drive link.",
          "Every image is picked up, subfolders included.",
          "The import runs in the background.",
          "Faces are detected automatically once photos arrive.",
        ]}
        bestFor={["Photographers who edit to Drive", "Studios on shared Drive storage", "Event teams"]}
        scene={<LottieScene src="/animations/cloud-import.json" className="mx-auto max-w-md" />}
        sceneCaption="Photos move from one public Drive link into your event folders, in the background."
        tone="default"
      />

      <QuestionSection
        id="how-to-import"
        tone="panel"
        question="How do you import photos from a Google Drive link?"
        answer="Paste your Google Drive folder’s public link into your Snapdaps event. Snapdaps fetches every image in it — including the ones inside subfolders — in the background, so you can close the page and get on with your work. Faces are detected automatically, and then you share the event link or QR code."
      >
        <InfoCards
          numbered
          items={[
            { title: "Share the Drive folder by link", body: "In Google Drive, set the folder to “Anyone with the link”." },
            { title: "Paste the link", body: "Snapdaps picks up every image in the folder and its subfolders." },
            { title: "Let it run", body: "The import works in the background — no need to keep the page open." },
            { title: "Share the event", body: "Send the link or put up the QR code; guests search with a selfie." },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="drive-folder-vs-snapdaps"
        question="Why not just share the Google Drive folder with guests?"
        answer="A shared Drive folder gives everyone every photo and leaves them to scroll for their own. Importing the same photos into Snapdaps turns them into an event gallery where each guest uploads a selfie and gets only the photos they appear in — faster for them and more private for everyone."
      >
        <ComparisonRows
          beforeLabel="Sharing the Drive folder"
          afterLabel="Importing into Snapdaps"
          rows={[
            { before: "Everyone can open every photo", after: "Each guest gets their own matches" },
            { before: "Guests download big batches to find a few", after: "Guests download just their photos" },
            { before: "One long folder link to pass around", after: "One event link or QR code" },
          ]}
        />
      </QuestionSection>

      <Faq items={faqs[PATH]} title="Google Drive import questions" tone="panel" />

      <CtaBand title="Turn your Drive folders into event galleries" body="Import from Drive. Let AI do the rest." />
    </>
  );
}
