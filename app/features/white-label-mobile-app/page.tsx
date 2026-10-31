import { Bell, CalendarDays, Download, Heart, ImageIcon, Images, LayoutGrid, Palette, ScanFace, Type } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { CtaBand } from "@/components/blocks/cta-band";
import { Faq } from "@/components/blocks/faq";
import { Hero } from "@/components/blocks/hero";
import { InfoCards } from "@/components/blocks/info-cards";
import { LeadCapture } from "@/components/blocks/lead-capture";
import { PageByline } from "@/components/blocks/page-byline";
import { QuestionSection } from "@/components/blocks/question-section";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { BrandedApp } from "@/components/mock/branded-app";
import { LottieScene } from "@/components/motion/lottie-scene";
import { faqs } from "@/content/faqs";
import { isIndexed, updatedOf } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   FEATURE · WHITE-LABEL MOBILE APP
   Draft copy by Claude — not from the content doc; reviewed by: pending. noindex until the
   team approves it (content/routes.ts → indexed: true).
   Facts from the team (31 Oct 2026): Android and iOS; the studio brands the app name, app
   icon, logo and colours; clients view galleries, search with a selfie, download, select
   favourites and get "photos ready" notifications; the app shows only that studio's portfolio
   and events; Snapdaps sets it up and publishes it;
   selected plans only. Not claimed until confirmed: splash screen, managing events from
   the app, setup time, prices. Screenshots to come — BrandedApp is a coded stand-in.
   Primary: white label photography app. Also: branded photo app for photographers,
   photo studio mobile app.
------------------------------------------------------------------------------------ */

const PATH = "/features/white-label-mobile-app";
const TITLE = "White-Label Mobile App for Photography Studios | Snapdaps";
const DESCRIPTION =
  "Your studio's own app on Android and iOS: your name, icon, logo and colours, only your portfolio and events, plus selfie search and downloads.";

export const metadata = buildMetadata({
  absoluteTitle: TITLE,
  description: DESCRIPTION,
  path: PATH,
  noindex: !isIndexed(PATH),
});

export default function WhiteLabelMobileAppPage() {
  return (
    <>
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Features", path: "/features" },
              { name: "White-label mobile app", path: PATH },
            ]}
          />
        }
        title="White-Label Mobile App for Photography Studios"
        subtitle="Your studio’s own app on Android and iOS."
        body={
          <p>
            Your clients open an app with your name and logo on it — and find their photos with a selfie, pick
            favourites and download. Snapdaps builds and publishes it for you.
          </p>
        }
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated={updatedOf(PATH)} />}
        visual={<BrandedApp />}
      />

      <UseCaseLead
        title="The white-label app, in short"
        summary="The Snapdaps white-label app is your photography studio’s own app on Android and iOS, under your name, icon, logo and colours. It shows only your studio — your portfolio and your events. Clients use it to find their photos with a selfie, pick favourites and download, and get a notification when their photos are ready."
        takeaways={[
          "Your studio’s app on Android and iOS.",
          "Your app name, icon, logo and colours.",
          "Only your portfolio and your events — no other studios.",
          "Selfie search, downloads, favourites and notifications.",
          "Snapdaps sets it up and publishes it for you.",
        ]}
        bestFor={["Photography studios", "Wedding photographers", "Event photography agencies"]}
        scene={<LottieScene src="/animations/app-development.json" className="mx-auto max-w-md" />}
        sceneCaption="You share your brand, Snapdaps builds and publishes the app, and your clients download it on Android and iOS."
        tone="default"
      />

      <QuestionSection
        id="what-is-a-white-label-app"
        tone="panel"
        question="What is a white-label photo sharing app?"
        answer="A white-label app is built by one company and published under another company’s brand. With Snapdaps, the face search, galleries and delivery come from Snapdaps, but your clients only see your studio — your app name in the store, your icon on their home screen, your logo and colours, and only your portfolio and events."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "What your clients see", body: "Your studio’s name, icon, logo and colours, and only your portfolio and events — never another studio’s." },
            { title: "What runs underneath", body: "Snapdaps face search, galleries, downloads and notifications, the same as on the web." },
          ].map((c) => (
            <div key={c.title} className="surface p-6">
              <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </QuestionSection>

      <QuestionSection
        id="what-you-can-brand"
        question="What can you brand in the app?"
        answer="The parts your clients notice first. Choose the app name shown in the Play Store and App Store, the app icon on their home screen, the logo inside the app and your studio’s colours. Everything your clients tap through then feels like your studio’s own product, not a third-party tool."
      >
        <InfoCards
          items={[
            { Icon: Type, title: "App name", body: "Your studio’s name in both stores and under the icon." },
            { Icon: ImageIcon, title: "App icon", body: "Your mark on your clients’ home screens." },
            { Icon: Images, title: "Logo", body: "Your logo at the top of every gallery in the app." },
            { Icon: Palette, title: "Colours", body: "Your brand colours across the app." },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="what-clients-get"
        tone="panel"
        question="What do your clients get in the app?"
        answer="Everything from your studio, in one place: your portfolio and your events. Clients find their own photos with a selfie, pick their favourites for you to see, and download the photos they want. A notification tells them as soon as their photos are ready, so nobody has to ask."
      >
        <InfoCards
          items={[
            { Icon: LayoutGrid, title: "Your portfolio", body: "Your best work, inside your own app." },
            { Icon: CalendarDays, title: "Your events", body: "Only the events your studio delivers." },
            { Icon: ScanFace, title: "Selfie search", body: "Every photo they appear in, found in seconds." },
            { Icon: Heart, title: "Photo selection", body: "Clients pick favourites; you see their selection." },
            { Icon: Download, title: "Downloads", body: "Saved straight to their phone." },
            { Icon: Bell, title: "Notifications", body: "A heads-up the moment their photos are ready." },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="setup"
        question="How does setting up a white-label app work?"
        answer="Snapdaps does it for you. Share your studio’s app name, icon, logo and colours, and Snapdaps sets up the app and publishes it on Android and iOS under your studio’s name. The white-label app is available on selected Snapdaps plans — book a demo to find out which one fits your studio."
      >
        <InfoCards
          numbered
          items={[
            { title: "Share your brand", body: "App name, icon, logo and colours." },
            { title: "Snapdaps builds it", body: "Your app is set up on the Snapdaps platform." },
            { title: "Published for you", body: "On the Play Store and the App Store, under your name." },
          ]}
        />
      </QuestionSection>

      <LeadCapture
        title="Get your studio its own app"
        body="Tell us about your studio and we’ll show you the white-label app, which plan includes it and what we need from you to publish it."
        points={["A walkthrough of the app on your phone", "Which plan includes the white-label app", "A reply within one working day"]}
        event="White-label mobile app"
        role="Studio / agency"
        submitLabel="Talk to us about my studio app"
        tone="panel"
      />

      <Faq items={faqs[PATH]} title="White-label app questions" />

      <CtaBand title="Your brand. Your app. Snapdaps underneath." body="Deliver every event through your studio’s own app." />
    </>
  );
}
