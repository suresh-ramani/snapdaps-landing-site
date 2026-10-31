import { Cake, Images, Lock, ScanFace, Send } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { EventPhotoHero } from "@/components/blocks/event-photo-hero";
import { LeadCapture } from "@/components/blocks/lead-capture";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { BirthdayScene } from "@/components/mock/event-scenes";
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
   USE CASE · BIRTHDAY PARTY
   Not in Website_Content_v2_1.docx. Draft copy by Claude — not from the content doc;
   reviewed by: pending. Indexed on the team's go-ahead (2026-10-30); `noindex` follows
   the `indexed` flag in content/routes.ts.
   Primary: birthday party photo sharing app.
   Also: share birthday photos with guests, kids' party photos privately.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases/birthday-party";
const TITLE = "Birthday Party Photo Sharing App with AI Face Search";
const DESCRIPTION =
  "Share birthday party photos with every guest the same day. Guests scan a QR code, upload a selfie and get only their own photos — no app, no login, no group chat.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  noindex: !isIndexed(PATH),
});

const birthdaySteps: WorkflowStep[] = [
  {
    key: "create",
    title: "Create the party in a couple of minutes",
    subtitle: "Name the event after the birthday star, and the party gallery is ready.",
    points: [
      "Folders for decorations, cake cutting, games and dance.",
      "One event per party — create as many as you like.",
      "Nothing to design or set up.",
    ],
  },
  {
    key: "upload",
    title: "Upload the party photos",
    subtitle: "Add the photographer’s photos from a computer or straight from Google Drive.",
    points: [
      "Bulk upload hundreds or thousands of photos.",
      "Drop each moment into its own folder.",
      "Add more photos to the party any time.",
    ],
  },
  {
    key: "detect",
    title: "Faces are found while you tidy up",
    subtitle: "Every guest’s face is detected automatically — no tagging kids or relatives by name.",
    points: ["Runs in the background.", "Works across every folder.", "No guest list to match against."],
  },
  {
    key: "share",
    title: "Send one link to the party group",
    subtitle: "Share the link in the WhatsApp group, or print the QR code for the venue.",
    points: [
      "One link for every guest.",
      "QR code on the cake table or the return gifts.",
      "No photos forwarded one by one.",
    ],
  },
  {
    key: "selfie",
    title: "Guests find their photos with a selfie",
    subtitle: "Each guest — or each child’s parent — gets just the photos they need.",
    points: ["Matches in seconds.", "View and download on their phone.", "No app or login."],
  },
];

export default function BirthdayPartyPage() {
  return (
    <PhotoPool {...eventSamples[PATH]}>
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
        body={
          <p>
            Upload the party photos once and share one link or QR code. Parents, cousins and friends each upload a
            selfie and get the photos they’re in, ready to download — instead of hundreds of pictures dropped into the
            family group.
          </p>
        }
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated="2026-10-30" />}
        visual={
          <EventPhotoHero
            photo="birthday-cake"
            alt="Rainbow birthday cake with lit candles"
            chips={[
              {
                Icon: Cake,
                title: "Cake-cutting photos",
                sub: "Found with a selfie",
              },
              {
                Icon: Lock,
                title: "Just your child’s photos",
                sub: "Not the whole album",
              },
            ]}
            qrLabel="Scan for party photos"
            align="right"
          />
        }
      />

      <UseCaseLead
        title="Birthday party photo sharing, in short"
        summary="With Snapdaps, a birthday party’s photos reach every guest without flooding the family WhatsApp group. Upload the photos into one party event, share one link or the QR code on the cake table, and each guest — or each child’s parent — uploads a selfie to get just the photos they need."
        takeaways={[
          "One link in the group instead of hundreds of photos.",
          "Parents find their child’s photos with a selfie.",
          "Folders for cake cutting, games and dance.",
          "Nothing to install, for grandparents or friends.",
        ]}
        bestFor={["Parents and hosts", "Party photographers", "Party planners"]}
        scene={<BirthdayScene />}
        sceneCaption="A QR standee by the cake: guests scan, take a selfie and get their party photos."
        tone="default"
      />

      <Story
        id="story"
        tone="problem"
        title="The cake is cut, the guests go home… and the photo requests start"
        subtitle="Everyone wants their pictures from the party. Someone has to send them."
        visual={
          <ChatMock
            title="Birthday party group"
            messages={[
              "Please send the cake-cutting photos!",
              "मेरे बेटे की फ़ोटो है क्या?",
              "Can you share the group pic?",
              "सबकी फ़ोटो एक साथ भेज दो",
            ]}
          />
        }
        narrative={
          <>
            <p>The party was perfect. Balloons, games, and a cake that didn’t last five minutes.</p>
            <p>By evening, your phone is buzzing.</p>
            <p>
              One parent wants the photos of their child. An aunt wants the family picture. Friends want the dance
              photos.
            </p>
            <p>
              So someone drops every photo into the group chat — and everyone scrolls through hundreds of pictures to
              find the few they’re in.
            </p>
            <p>Or nobody sends anything, and the photos stay on one phone.</p>
          </>
        }
        powerLine="Party photos are best shared the same day — not dug out a month later."
      />

      <QuestionSection
        id="how-it-works"
        question="How does photo sharing work at a birthday party?"
        answer="The photographer, or whoever took the photos, uploads them to one Snapdaps event for the party. Snapdaps detects every face automatically. You share one link in the party’s WhatsApp group or print the QR code for the venue, and each guest uploads a selfie to get only the photos they’re in."
      >
        <WorkflowSteps steps={birthdaySteps} />
      </QuestionSection>

      <Section id="features" tone="panel" title="Everything you need for birthday party photo sharing">
        <FeatureBento
          items={[
            {
              key: "face-search",
              title: "Parents find their child in seconds",
              body: "Upload a selfie of your child and see every party photo they appear in — no scrolling through the whole album.",
            },
            {
              key: "gallery",
              title: "A party album sorted by moment",
              body: "Folders for cake cutting, games and dance keep the album easy to browse.",
            },
            {
              key: "upload",
              title: "Every photo in one place",
              body: "Bulk upload from your computer or straight from the photographer’s Google Drive.",
            },
            {
              key: "share",
              title: "One QR code for every guest",
              body: "Put it on the cake table or the return gifts, or drop the link in the party WhatsApp group.",
            },
            {
              key: "mobile",
              title: "Made for phones",
              body: "Guests open the link in their phone’s browser and download their photos. Nothing to install.",
            },
            {
              key: "privacy",
              title: "Kids’ photos stay with their families",
              body: "Each guest sees only the photos they’re in, so children’s pictures aren’t passed around the whole group.",
            },
          ]}
        />
      </Section>

      <QuestionSection
        id="without-group-chat"
        question="How do you share birthday photos without a big group chat?"
        answer="Share one Snapdaps link in the group instead of the photos themselves. Each guest uploads a selfie and gets only the photos they appear in, so nobody scrolls through hundreds of pictures, phones don’t fill up with other people’s photos, and the group stays free for birthday wishes."
      >
        <ComparisonRows
          beforeLabel="Photos in the group chat"
          rows={[
            {
              before: "Hundreds of photos dropped into the group",
              after: "One link in the group",
            },
            {
              before: "Everyone scrolls to find themselves",
              after: "A selfie finds each guest’s photos",
            },
            {
              before: "Phones fill up with everyone’s photos",
              after: "Guests download only their own",
            },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="kids-privacy"
        tone="panel"
        question="Are children’s party photos kept private?"
        answer="Each guest sees only the photos they appear in. A parent searching with their child’s selfie gets that child’s photos, not everyone else’s, and the party opens only through the link or QR code you share. That keeps children’s pictures with their own families instead of circulating around a large group chat."
      >
        <InfoCards
          items={[
            {
              Icon: Send,
              title: "You choose who gets the link",
              body: "The party gallery opens only from the link or QR code you hand out.",
            },
            {
              Icon: ScanFace,
              title: "A face is the key",
              body: "Search starts from a selfie, so guests see the photos they’re in — not the whole album.",
            },
            {
              Icon: Images,
              title: "Kept in your party’s event",
              body: "Photos stay in the event and folders you created, organised the way you set them up.",
            },
          ]}
        />
      </QuestionSection>

      <LeadCapture
        title="Throwing a party soon? Get its photos sorted"
        body="Tell us the date and we’ll help you set up the party event and its QR code, so every guest gets their photos the same day."
        points={[
          "Set up the party event together",
          "A printable QR code for the venue",
          "A reply within one working day",
        ]}
        event="Birthday party"
        role="Couple or host"
        submitLabel="Help me set up my party"
        tone="default"
      />

      <Faq items={faqs[PATH]} title="Birthday photo sharing questions" tone="panel" />

      <CtaBand
        title="Give every party guest their photos the same day"
        body="Upload once. Share one link. Let every guest find their own photos."
      />
    </PhotoPool>
  );
}
