import { Medal, UserRound } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { EventPhotoHero } from "@/components/blocks/event-photo-hero";
import { LeadCapture } from "@/components/blocks/lead-capture";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { SportsScene } from "@/components/mock/event-scenes";
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
   USE CASE · SPORTS TOURNAMENTS
   Not in Website_Content_v2_1.docx. Draft copy by Claude — not from the content doc;
   reviewed by: pending. Indexed on the team's go-ahead (2026-10-30); `noindex` follows
   the `indexed` flag in content/routes.ts.
   Primary: sports tournament photo sharing.
   Also: players and parents find action shots, match-day photo gallery.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/sports-events";
const TITLE = "Sports Tournament Photo Sharing with AI Face Search";
const DESCRIPTION =
  "Players, parents and fans find their tournament photos with a selfie. One QR code for every match day — no app, no login, no endless scrolling.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  noindex: !isIndexed(PATH),
});

const sportsSteps: WorkflowStep[] = [
  {
    key: "create",
    title: "Create the tournament, a folder per match day",
    subtitle: "Set up the tournament in a couple of minutes.",
    points: [
      "Folders by match, day, ground or team.",
      "One event for the whole tournament.",
      "The gallery is ready before the first match.",
    ],
  },
  {
    key: "upload",
    title: "Upload each day’s photos",
    subtitle: "Add photos after every match day, from a computer or Google Drive.",
    points: [
      "Bulk upload thousands of action shots.",
      "Keep adding to the same tournament.",
      "Compress the photos if you want.",
    ],
  },
  {
    key: "detect",
    title: "Every player’s face is found",
    subtitle: "Snapdaps detects faces automatically — nobody matches jersey numbers to names.",
    points: ["No tagging players or teams.", "Runs in the background.", "Across every match folder."],
  },
  {
    key: "share",
    title: "Share the QR code at the ground",
    subtitle: "Put it at the registration desk and send the link to every team group.",
    points: [
      "On banners, the scoreboard or the registration desk.",
      "In every team’s WhatsApp group.",
      "Easy to forward to parents and fans.",
    ],
  },
  {
    key: "selfie",
    title: "Players find their action shots",
    subtitle: "A selfie returns every photo they’re in, from warm-up to podium.",
    points: ["Matches in seconds.", "Parents can search for their child.", "No app or account."],
  },
];

export default function SportsEventsPage() {
  return (
    <PhotoPool {...eventSamples[PATH]}>
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Use cases", path: "/use-cases" },
              { name: "Sports tournaments", path: PATH },
            ]}
          />
        }
        title="Sports Tournament Photo Sharing with AI Face Search"
        subtitle="Players, parents and fans find their action shots with a selfie."
        body={
          <p>
            Upload every match day into one tournament gallery and share one QR code at the ground. Players find their
            action shots, parents find their kids and teams find their podium photo — each with a selfie.
          </p>
        }
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated="2026-10-30" />}
        visual={
          <EventPhotoHero
            photo="sports-batsman"
            alt="Young cricketer in whites lifting his bat at the crease"
            chips={[
              {
                Icon: Medal,
                title: "Action shots found",
                sub: "Warm-up to podium",
              },
              {
                Icon: UserRound,
                title: "Parents search too",
                sub: "With their child’s photo",
              },
            ]}
            qrLabel="Scoreboard QR"
            align="left"
          />
        }
      />

      <UseCaseLead
        title="Sports tournament photo sharing, in short"
        summary="Snapdaps puts a whole tournament’s photos in one gallery that players, parents and fans search with a selfie. Upload each match day into folders by match, ground or team, share the QR code at the ground and the link in team groups, and everyone downloads the action shots they appear in."
        takeaways={[
          "One tournament gallery, folders per match day or team.",
          "Parents can search with their child’s photo.",
          "QR at the ground, link in every team group.",
          "No scrolling through thousands of shots.",
        ]}
        bestFor={["Tournament organisers", "Schools and academies", "Sports photographers"]}
        scene={<SportsScene />}
        sceneCaption="A QR code on the scoreboard leads players and parents to their match-day photos."
        tone="default"
      />

      <Story
        id="story"
        tone="problem"
        title="Thousands of action shots. One player looking for theirs."
        subtitle="After a tournament, everyone wants the photo of their moment — the catch, the goal, the podium."
        visual={
          <ChatMock
            title="U-14 team parents"
            messages={[
              "Any photos of the final? 🏏",
              "मेरे बेटे की बैटिंग वाली फ़ोटो?",
              "Need the team photo for the club page",
              "Where is the trophy pic?",
            ]}
          />
        }
        narrative={
          <>
            <p>Match after match, the photographers keep shooting.</p>
            <p>By the final whistle, there are thousands of photos.</p>
            <p>
              Then every team group fills with requests. Parents want their child’s best shot. Players want the photo of
              their catch. Coaches want the team picture.
            </p>
            <p>Someone shares one giant folder. Everyone scrolls. Most give up.</p>
          </>
        }
        powerLine="Every player deserves their moment — without scrolling through everyone else’s."
      />

      <QuestionSection
        id="how-it-works"
        question="How does photo sharing work at a sports tournament?"
        answer="Create one Snapdaps event for the tournament with a folder for each match day, ground or team, and upload the photos after each day’s play. Faces are detected automatically. Share the QR code at the ground and the link in team groups, and players, parents and fans find their photos with a selfie."
      >
        <WorkflowSteps steps={sportsSteps} />
      </QuestionSection>

      <Section id="features" tone="panel" title="Everything you need for sports tournament photo sharing">
        <FeatureBento
          items={[
            {
              key: "face-search",
              title: "Every player finds their moment",
              body: "A selfie returns their batting, bowling, goal or podium shots — out of thousands of tournament photos.",
            },
            {
              key: "gallery",
              title: "Organised by match day",
              body: "Folders for each match, ground or team keep a multi-day tournament easy to follow.",
            },
            {
              key: "upload",
              title: "Built for thousands of action shots",
              body: "Bulk upload every match day’s photos into the same tournament, from a computer or Google Drive.",
            },
            {
              key: "share",
              title: "One QR code at the ground",
              body: "On the registration desk, the scoreboard or in every team’s WhatsApp group.",
            },
            {
              key: "mobile",
              title: "Parents download on their phones",
              body: "Nothing to install — open the link, upload a selfie, download the photos.",
            },
            {
              key: "privacy",
              title: "Young players’ photos stay with their families",
              body: "Each person sees only the photos they appear in, not the whole tournament’s.",
            },
          ]}
        />
      </Section>

      <QuestionSection
        id="parents"
        question="How do parents find photos of their child at a sports tournament?"
        answer="Open the tournament link or scan the QR code, then upload a clear photo of your child’s face. Snapdaps shows every photo they appear in across all matches and days, ready to download on your phone. Parents don’t scroll through thousands of shots, and they see only the photos their child appears in."
      >
        <InfoCards
          numbered
          items={[
            {
              title: "Open the tournament link",
              body: "From the team group, or by scanning the QR code at the ground.",
            },
            {
              title: "Upload your child’s photo",
              body: "A clear, front-facing picture of their face works best.",
            },
            {
              title: "Download their best shots",
              body: "Every match, every day — saved straight to your phone.",
            },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="match-day-gallery"
        tone="panel"
        question="How do teams get a match-day photo gallery?"
        answer="Create one tournament event with a folder for each match day, ground or team, and upload the photos after every day’s play. Share the link in each team’s WhatsApp group. Players and coaches open the gallery, find themselves with a selfie and download their photos, so the whole tournament stays in one place."
      >
        <ComparisonRows
          rows={[
            {
              before: "One giant folder for the whole tournament",
              after: "Folders by match day, ground or team",
            },
            {
              before: "Players scroll through every match",
              after: "A selfie finds each player’s photos",
            },
            {
              before: "Photos sent to each team separately",
              after: "One link for every team",
            },
          ]}
        />
      </QuestionSection>

      <LeadCapture
        title="Organising a tournament? Set up its photo gallery"
        body="Share your tournament dates and format, and we’ll help set up match-day folders and the QR code, so players and parents find their photos after every game."
        points={[
          "Match-day folders set up together",
          "A QR code for the ground and team groups",
          "A reply within one working day",
        ]}
        event="Sports tournament"
        role="Other"
        submitLabel="Book my tournament demo"
        tone="default"
      />

      <Faq items={faqs[PATH]} title="Sports tournament photo sharing questions" tone="panel" />

      <CtaBand
        title="Give every player their moment"
        body="Upload each match day once. Players and parents find their photos with a selfie."
      />
    </PhotoPool>
  );
}
