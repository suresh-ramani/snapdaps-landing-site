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
import { StudioAppBento } from "@/components/product/studio-app-bento";
import { faqs } from "@/content/faqs";
import { isIndexed, updatedOf } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   FEATURE · YOUR STUDIO APP (route keeps the old "white-label-mobile-app" slug)
   Plain words on the page (owner, 2026-11-26): no "white-label", "iOS", "publish", "platform" —
   say "your own studio app", "Android phones and iPhones", "put it on the app stores". The term
   "white-label" appears once, explained, in the first answer, for people who search for it.
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
const TITLE = "Your Own Photo App for Photography Studios | Snapdaps";
const DESCRIPTION =
  "Your studio's own app on Android phones and iPhones: your name, icon, logo and colours, only your work and events, plus selfie search and downloads.";

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
              { name: "Your studio app", path: PATH },
            ]}
          />
        }
        title="Your Studio’s Own Photo App"
        subtitle="Your name and logo on your clients’ phones."
        body={
          <p>
            Your clients open an app with your name and logo on it — and find their photos with a selfie, pick
            favourites and download. We build it and put it on the Play Store and App Store for you.
          </p>
        }
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated={updatedOf(PATH)} />}
        visual={<BrandedApp />}
      />

      <UseCaseLead
        title="Your studio app, in short"
        summary="Your studio gets its own app on Android phones and iPhones, with your studio’s name, icon, logo and colours. It shows only your work and your events. Clients open it to find their photos with a selfie, pick favourites and download them, and get an alert on their phone the moment their photos are ready."
        takeaways={[
          "Your own app on Android phones and iPhones.",
          "Your name, icon, logo and colours.",
          "Only your work and your events — no other studios.",
          "Selfie search, downloads, favourites and photo-ready alerts.",
          "We build it and put it on the app stores for you.",
        ]}
        bestFor={["Photography studios", "Wedding photographers", "Event photography agencies"]}
        scene={<StudioAppBento />}
        sceneCaption="Your name and logo on your clients’ phones, their photos found with a selfie, and an alert when they’re ready."
        tone="default"
      />

      <QuestionSection
        id="your-own-branded-app"
        tone="panel"
        question="What does it mean to have your own branded photo app?"
        answer="It means your clients see only your studio. Snapdaps quietly does the work — face search, galleries and downloads — while the app carries your name in the app store, your icon on their phone, your logo and colours, and only your work and events. You may hear it called a white-label app."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "What your clients see", body: "Your studio’s name, icon, logo and colours, and only your work and events — never another studio’s." },
            { title: "What Snapdaps takes care of", body: "Face search, galleries, downloads and photo-ready alerts — the same as on the web." },
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
        answer="The parts your clients notice first. Choose the app name shown in the Play Store and App Store, the app icon on their home screen, the logo inside the app and your studio’s colours. Everything your clients tap through then feels like your studio’s own app, not someone else’s."
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
        answer="Everything from your studio, in one place: your best work and your events. Clients find their own photos with a selfie, pick their favourites for you to see, and download the photos they want. An alert on their phone tells them as soon as their photos are ready, so nobody has to ask."
      >
        <InfoCards
          items={[
            { Icon: LayoutGrid, title: "Your portfolio", body: "Your best work, inside your own app." },
            { Icon: CalendarDays, title: "Your events", body: "Only the events your studio delivers." },
            { Icon: ScanFace, title: "Selfie search", body: "Every photo they appear in, found in seconds." },
            { Icon: Heart, title: "Photo selection", body: "Clients pick favourites; you see their selection." },
            { Icon: Download, title: "Downloads", body: "Saved straight to their phone." },
            { Icon: Bell, title: "Photo-ready alerts", body: "A message on their phone the moment their photos are ready." },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="setup"
        question="How do you get your own studio app?"
        answer="We do it for you. Send us your studio’s app name, icon, logo and colours, and we build the app and put it on the Play Store and App Store under your studio’s name. Your own app comes with selected Snapdaps plans — book a demo to find out which one fits your studio."
      >
        <InfoCards
          numbered
          items={[
            { title: "Send us your brand", body: "App name, icon, logo and colours." },
            { title: "We build it", body: "Your app is made for you — nothing to code or set up." },
            { title: "Live on the app stores", body: "On the Play Store and the App Store, under your name." },
          ]}
        />
      </QuestionSection>

      <LeadCapture
        title="Get your studio its own app"
        body="Tell us about your studio and we’ll show you the app, which plan includes it and what we need from you to get it live."
        points={["A walkthrough of the app on your phone", "Which plan includes your own app", "A reply within one working day"]}
        event="Studio app"
        role="Studio / agency"
        submitLabel="Talk to us about my studio app"
        tone="panel"
      />

      <Faq items={faqs[PATH]} title="Studio app questions" />

      <CtaBand title="Your brand. Your app. We take care of the rest." body="Deliver every event through your studio’s own app." />
    </>
  );
}
