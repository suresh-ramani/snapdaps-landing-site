import { Sparkles, Trophy, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { EventPhotoHero } from "@/components/blocks/event-photo-hero";
import { LeadCapture } from "@/components/blocks/lead-capture";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { AwardScene } from "@/components/mock/event-scenes";
import { ComparisonRows } from "@/components/blocks/comparison-rows";
import { CtaBand } from "@/components/blocks/cta-band";
import { Faq } from "@/components/blocks/faq";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { Hero } from "@/components/blocks/hero";
import { WorkflowSteps, type WorkflowStep } from "@/components/blocks/how-it-works";
import { InfoCards } from "@/components/blocks/info-cards";
import { PageByline } from "@/components/blocks/page-byline";
import { QuestionSection } from "@/components/blocks/question-section";
import { Section } from "@/components/blocks/section";
import { Story } from "@/components/blocks/story";
import { eventSamples } from "@/components/mock/photos";
import { PhotoPool } from "@/components/mock/photo-pool";
import { ChatMock } from "@/components/mock/screens";
import { faqs } from "@/content/faqs";
import { isIndexed } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   USE CASE · AWARD CEREMONY
   Not in Website_Content_v2_1.docx. Draft copy by Claude — not from the content doc;
   reviewed by: pending. Indexed on the team's go-ahead (2026-10-30); `noindex` follows
   the `indexed` flag in content/routes.ts.
   Primary: award ceremony photo sharing.
   Also: winners find stage photos, share award night photos with family.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/award-ceremony";
const TITLE = "Award Ceremony Photo Sharing with AI Face Search";
const DESCRIPTION =
  "Winners get their stage photos as soon as they're uploaded. Guests scan a QR code, upload a selfie and download every photo they're in — no app, no login.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  noindex: !isIndexed(PATH),
});

const awardSteps: WorkflowStep[] = [
  {
    key: "create",
    title: "Create the ceremony, a folder per category",
    subtitle: "Set up the awards night in a couple of minutes.",
    points: [
      "Folders by award category, segment or venue area.",
      "Separate folders for the red carpet and the after-party.",
      "The gallery is ready before the first award.",
    ],
  },
  {
    key: "upload",
    title: "Upload the night’s photos",
    subtitle: "Add each category’s photos from a computer or Google Drive.",
    points: [
      "Bulk upload thousands of photos.",
      "Each category into its own folder.",
      "Compress the photos if you want.",
    ],
  },
  {
    key: "detect",
    title: "Every winner’s face is found",
    subtitle: "Snapdaps detects faces automatically — nobody matches names to photos.",
    points: ["No tagging winners or guests.", "Runs in the background.", "Across every category folder."],
  },
  {
    key: "share",
    title: "Show the QR code on the big screen",
    subtitle: "Put it up at the close of the ceremony and add the link to the thank-you email.",
    points: [
      "On the stage screen or table cards.",
      "In the post-event email to nominees.",
      "Easy for winners to forward to family.",
    ],
  },
  {
    key: "selfie",
    title: "Winners find their stage moment",
    subtitle: "A selfie returns every photo they’re in, from the red carpet to the trophy.",
    points: ["Matches in seconds.", "Download on their phone.", "No app or account."],
  },
];

export default function AwardCeremonyPage() {
  return (
    <PhotoPool {...eventSamples[PATH]}>
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
        body={
          <p>
            Upload the ceremony’s photos once and show the QR code on screen. Winners, nominees and guests upload a
            selfie and download every photo they’re in — the trophy moment, the red carpet, the team table.
          </p>
        }
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated="2026-10-30" />}
        visual={
          <EventPhotoHero
            photo="award-trophies"
            alt="Gold and silver trophies lined up on a table"
            chips={[
              {
                Icon: Trophy,
                title: "Stage moment found",
                sub: "The trophy handover",
              },
              {
                Icon: Users,
                title: "Team table photos",
                sub: "For everyone in them",
              },
            ]}
            qrLabel="Big screen QR"
            align="right"
          />
        }
      />

      <UseCaseLead
        title="Award ceremony photo sharing, in short"
        summary="Snapdaps lets every winner find their stage photos without anyone sorting the ceremony album. Upload the night’s photos into folders by award category, show the QR code on the big screen, and each winner, nominee or guest uploads a selfie to download the trophy handover, red-carpet and team photos they appear in."
        takeaways={[
          "Folders by award category, segment or venue area.",
          "One QR code on the big screen and table cards.",
          "Winners forward the link to family who weren’t there.",
          "Each guest sees only their own photos.",
        ]}
        bestFor={["Award organisers", "Corporate event teams", "Event photographers"]}
        scene={<AwardScene />}
        sceneCaption="From the big-screen QR code to the winner’s phone, with their stage moment."
        tone="default"
      />

      <Story
        id="story"
        tone="problem"
        title="The trophy is on the shelf. The stage photo is nowhere to be found."
        subtitle="Winners want to share their moment the night it happens — not after someone sorts the album."
        visual={
          <ChatMock
            title="Awards night — team"
            messages={[
              "Congrats!! Post the stage photo 🏆",
              "Who has the pic with the trophy?",
              "स्टेज वाली फ़ोटो भेजो ना",
              "Need it for our company page",
            ]}
          />
        }
        narrative={
          <>
            <p>The name is announced. The walk to the stage. The handshake, the trophy, the photo.</p>
            <p>It’s the picture every winner wants — for their family, their team and their company page.</p>
            <p>But the photographers covered every category, the red carpet and the after-party.</p>
            <p>Finding one winner’s moment means scrolling through all of it, or waiting until someone sorts it.</p>
            <p>By then, the congratulations have moved on.</p>
          </>
        }
        powerLine="Recognition is best shared while the applause is still fresh."
      />

      <QuestionSection
        id="how-it-works"
        question="How does photo sharing work at an award ceremony?"
        answer="Create one Snapdaps event for the ceremony with a folder for each award category, then upload the photos. Faces are detected automatically. Show the QR code on the big screen and send the link to nominees, and every winner uploads a selfie to find their stage photos, red-carpet shots and team pictures."
      >
        <WorkflowSteps steps={awardSteps} />
      </QuestionSection>

      <Section id="features" tone="panel" title="Everything you need for award ceremony photo sharing">
        <FeatureBento
          items={[
            {
              key: "face-search",
              title: "Winners find their moment in seconds",
              body: "A selfie returns the trophy shot, the red carpet and the team table — out of thousands of ceremony photos.",
            },
            {
              key: "gallery",
              title: "Sorted by category",
              body: "Folders for each award category and segment keep a long ceremony easy to browse.",
            },
            {
              key: "upload",
              title: "The whole night in one place",
              body: "Bulk upload every photo from the ceremony, from a computer or Google Drive.",
            },
            {
              key: "share",
              title: "One QR code on the big screen",
              body: "Show it at the close, print it on table cards, or add the link to the thank-you email.",
            },
            {
              key: "mobile",
              title: "Ready to post",
              body: "Winners download their photos to their phone and share them with family, team and company page.",
            },
            {
              key: "privacy",
              title: "Each guest sees their own photos",
              body: "Guests get only the photos they’re in, not the entire ceremony album.",
            },
          ]}
        />
      </Section>

      <QuestionSection
        id="stage-photos"
        question="How do award winners get their stage photos?"
        answer="Show the ceremony’s QR code on the big screen or table cards, and send the link to nominees afterwards. Each winner uploads a selfie and sees every photo they’re in — the walk to the stage, the trophy handover and the team celebration — ready to download and share as soon as the photos are uploaded."
      >
        <InfoCards
          items={[
            {
              Icon: Trophy,
              title: "On stage",
              body: "The announcement, the handshake and the trophy — found from one selfie.",
            },
            {
              Icon: Sparkles,
              title: "On the red carpet",
              body: "Arrival photos land in the same search, even from a separate folder.",
            },
            {
              Icon: Users,
              title: "With the team",
              body: "Table and group photos appear too, for everyone who’s in them.",
            },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="family-at-home"
        tone="panel"
        question="Can winners share their photos with family who weren’t there?"
        answer="Yes. The ceremony link opens in any browser, so winners can forward it to family at home. Each person who uploads a selfie sees only the photos they appear in, and winners can download their own photos and send them on WhatsApp — so the people who couldn’t attend still share the moment."
      >
        <ComparisonRows
          rows={[
            {
              before: "Family waits for someone to forward photos",
              after: "Winners forward one link",
            },
            {
              before: "The stage moment lost in a long album",
              after: "A selfie finds each person’s photos",
            },
            {
              before: "Shared weeks after the ceremony",
              after: "Shared as soon as it’s uploaded",
            },
          ]}
        />
      </QuestionSection>

      <LeadCapture
        title="Hosting an awards night? Plan the photos with us"
        body="Tell us about your ceremony and we’ll show you how winners will get their stage photos — and help set up category folders and the QR code."
        points={[
          "See a winner’s experience on your phone",
          "Category folders set up together",
          "A reply within one working day",
        ]}
        event="Award ceremony"
        role="Event planner"
        submitLabel="Book my awards demo"
        tone="default"
      />

      <Faq items={faqs[PATH]} title="Award ceremony photo sharing questions" tone="panel" />

      <CtaBand
        title="Let every winner share their moment"
        body="Upload the ceremony once. Winners find their photos with a selfie."
      />
    </PhotoPool>
  );
}
