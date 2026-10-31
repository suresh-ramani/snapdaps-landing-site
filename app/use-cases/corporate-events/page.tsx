import { Mail, Presentation, QrCode, Share2 } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { EventPhotoHero } from "@/components/blocks/event-photo-hero";
import { LeadCapture } from "@/components/blocks/lead-capture";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { LottieScene } from "@/components/motion/lottie-scene";
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
   USE CASE · CORPORATE EVENTS
   Not in Website_Content_v2_1.docx. Draft copy by Claude — not from the content doc;
   reviewed by: pending. Indexed on the team's go-ahead (2026-10-30); `noindex` follows
   the `indexed` flag in content/routes.ts.
   Primary: corporate event photo sharing.
   Also: conference photos for attendees, offsite photos, event photos for LinkedIn.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/corporate-events";
const TITLE = "Corporate Event Photo Sharing with AI Face Search";
const DESCRIPTION =
  "Share conference, offsite and corporate event photos with every attendee. They scan a QR code, upload a selfie and download their own photos in seconds.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  noindex: !isIndexed(PATH),
});

const corporateSteps: WorkflowStep[] = [
  {
    key: "create",
    title: "Create the event, a folder per session",
    subtitle: "Set up the conference, offsite or launch in a couple of minutes.",
    points: [
      "Folders by day, session, workshop or venue.",
      "A separate event for every conference — unlimited events.",
      "The gallery is ready before doors open.",
    ],
  },
  {
    key: "upload",
    title: "Upload photos as each day wraps",
    subtitle: "Add each day’s photos from a computer or Google Drive.",
    points: [
      "Bulk upload thousands of photos.",
      "Keep adding to the same event, day by day.",
      "Each session’s photos in its own folder.",
    ],
  },
  {
    key: "detect",
    title: "Attendees’ faces are detected",
    subtitle: "Every face is found automatically — no badge lists or name tags to match.",
    points: ["No manual tagging of attendees.", "Runs in the background.", "Across every session folder."],
  },
  {
    key: "share",
    title: "Put the QR code on screen",
    subtitle: "Show it between sessions and add the link to the follow-up email.",
    points: [
      "On stage screens, standees and badges.",
      "In the post-event email.",
      "In the team’s WhatsApp or Slack group.",
    ],
  },
  {
    key: "selfie",
    title: "Attendees download their photos",
    subtitle: "Each attendee uploads a selfie and gets their photos, ready to post.",
    points: ["Matches in seconds.", "On their phone, in the browser.", "No app or account."],
  },
];

export default function CorporateEventsPage() {
  return (
    <PhotoPool {...eventSamples[PATH]}>
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Use cases", path: "/use-cases" },
              { name: "Corporate events", path: PATH },
            ]}
          />
        }
        title="Corporate Event Photo Sharing with AI Face Search"
        subtitle="Give every attendee their conference, offsite or launch photos instantly."
        body={
          <p>
            Upload the event’s photos once and put one QR code on the screens. Every attendee, speaker and sponsor gets
            the photos they’re in — ready for LinkedIn while people are still talking about the event.
          </p>
        }
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated="2026-10-31" />}
        visual={
          <EventPhotoHero
            photo="corporate-conference"
            alt="Attendees seated at a conference session"
            chips={[
              {
                Icon: Presentation,
                title: "QR on the stage screen",
                sub: "Between sessions",
              },
              {
                Icon: Share2,
                title: "Ready for LinkedIn",
                sub: "Attendees post their own",
              },
            ]}
            qrLabel="Event photos QR"
            align="left"
          />
        }
      />

      <UseCaseLead
        title="Corporate event photo sharing, in short"
        summary="Snapdaps gets conference, offsite and launch photos to every attendee without a shared drive. Upload each day’s photos into one event with folders by session, put the QR code on stage screens and badges, and attendees take a selfie to download their own photos — ready to post while the event is still fresh."
        takeaways={[
          "Folders by day, session, workshop or venue.",
          "QR on screens, badges and the follow-up email.",
          "Speakers, sponsors and attendees each find their own photos.",
          "No drive access requests, no app, no login.",
        ]}
        bestFor={["Corporate event teams", "HR and internal comms", "Conference organisers"]}
        scene={<LottieScene src="/animations/seminar-room.json" className="mx-auto max-w-md" />}
        sceneCaption="Between sessions, attendees scan the QR code on the stage screen and get their own event photos."
        tone="default"
      />

      <Story
        id="story"
        tone="problem"
        title="The conference is over. The photos are still on someone’s drive."
        subtitle="Attendees want their photos while the event is fresh — speakers for LinkedIn, teams for the intranet."
        visual={
          <ChatMock
            title="Offsite team group"
            messages={[
              "Anyone got the photos from the keynote?",
              "Need my panel photo for LinkedIn 🙏",
              "टीम फ़ोटो किसके पास है?",
              "Is there a link for the event pics?",
            ]}
          />
        }
        narrative={
          <>
            <p>Two days of sessions, panels and networking.</p>
            <p>Attendees photographed on stage, at the booths and over coffee.</p>
            <p>Then the emails start: the panel photo, the team photo, the link to the event pictures.</p>
            <p>Someone shares a drive folder with thousands of images. Most attendees never find themselves in it.</p>
            <p>And the posts that would have carried your event further never get written.</p>
          </>
        }
        waiting={{ title: "Event photos", steps: ["Event wrapped", "Agency sorting photos", "Drive folder shared", "Photos with every attendee"], waiting: "Attendees and speakers are still waiting" }}
        powerLine="An event that isn’t shared after it ends is an event fewer people hear about."
      />

      <QuestionSection
        id="how-it-works"
        question="How does photo sharing work at a corporate event?"
        answer="Create one Snapdaps event with folders for each day or session, and upload the photos as each day wraps. Faces are detected automatically. Show the QR code on stage screens and add the link to the follow-up email, and every attendee uploads a selfie to download only the photos they appear in."
      >
        <WorkflowSteps steps={corporateSteps} />
      </QuestionSection>

      <Section id="features" tone="panel" title="Everything you need for corporate event photo sharing">
        <FeatureBento
          items={[
            {
              key: "face-search",
              title: "Every attendee finds themselves",
              body: "Speakers, delegates and sponsors upload a selfie and see their photos — no hunting through thousands of event shots.",
            },
            {
              key: "gallery",
              title: "Organised by day and session",
              body: "Folders for keynotes, workshops and networking keep a multi-day event easy to browse.",
            },
            {
              key: "upload",
              title: "Built for multi-day events",
              body: "Bulk upload each day’s photos into the same event, from a computer or Google Drive.",
            },
            {
              key: "share",
              title: "One QR code on every screen",
              body: "Show it between sessions, print it on badges, or add the link to the follow-up email.",
            },
            {
              key: "mobile",
              title: "Ready for LinkedIn",
              body: "Attendees download their photos to their phone and post them while the event is fresh.",
            },
            {
              key: "privacy",
              title: "Attendees see only their own photos",
              body: "Each person gets the photos they appear in — not a shared folder of every guest.",
            },
          ]}
        />
      </Section>

      <QuestionSection
        id="conference-photos"
        question="How do you share conference photos with attendees?"
        answer="Put the event’s QR code on stage screens, standees or badges, and send the link in the follow-up email. Attendees upload a selfie and download every photo they appear in — keynote, panel, booth or team dinner — in seconds, so they can post them on LinkedIn while people are still talking about the event."
      >
        <InfoCards
          items={[
            {
              Icon: Presentation,
              title: "Between sessions",
              body: "The QR code on the stage screen while the room changes over.",
            },
            {
              Icon: QrCode,
              title: "On badges and standees",
              body: "Attendees scan whenever they have a moment — no link to type.",
            },
            {
              Icon: Mail,
              title: "In the follow-up email",
              body: "One link for everyone who attended, sent with the thank-you note.",
            },
            {
              Icon: Share2,
              title: "Ready to post",
              body: "Photos download to the attendee’s phone, ready for LinkedIn.",
            },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="offsite-photos"
        tone="panel"
        question="How do teams get offsite photos without a shared drive?"
        answer="Create one event for the offsite with a folder for each day or activity, and share the link in the team’s WhatsApp or Slack group. Each colleague uploads a selfie and downloads only the photos they’re in, so nobody requests access to a drive, scrolls through every photo or asks the organiser to send theirs."
      >
        <ComparisonRows
          beforeLabel="Shared drive"
          rows={[
            {
              before: "A drive folder everyone requests access to",
              after: "One link in the team group",
            },
            {
              before: "Scrolling the whole offsite to find yourself",
              after: "A selfie finds your photos",
            },
            {
              before: "The organiser forwards photos on request",
              after: "Everyone downloads their own",
            },
          ]}
        />
      </QuestionSection>

      <LeadCapture
        title="Running a conference or offsite? Let’s plan its photos"
        body="Share your event dates and format, and we’ll show you how attendees will get their photos — and help set up folders and the QR code."
        points={[
          "A demo built around your event format",
          "Folders and QR code set up together",
          "A reply within one working day",
        ]}
        event="Corporate event"
        role="Event planner"
        submitLabel="Book my event demo"
        tone="default"
      />

      <Faq items={faqs[PATH]} title="Corporate event photo sharing questions" tone="panel" />

      <CtaBand
        title="Make your next event the one attendees post about"
        body="Upload once, share one QR code, and every attendee gets their photos."
      />
    </PhotoPool>
  );
}
