import { Globe, Images, Link2 } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { CtaBand } from "@/components/blocks/cta-band";
import { EventPhotoHero } from "@/components/blocks/event-photo-hero";
import { Faq } from "@/components/blocks/faq";
import { Hero } from "@/components/blocks/hero";
import { PageByline } from "@/components/blocks/page-byline";
import { QuestionSection } from "@/components/blocks/question-section";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { LottieScene } from "@/components/motion/lottie-scene";
import { faqs } from "@/content/faqs";
import { isIndexed, updatedOf } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   FEATURE · PHOTOGRAPHER PORTFOLIO
   Draft copy by Claude — not from the content doc; reviewed by: pending. noindex until the
   team approves it (content/routes.ts → indexed: true).
   Facts from the team (31 Oct 2026): portfolio with a custom domain or a Snapdaps subdomain
   (all live when the site launches). Nothing else is claimed (no booking, contact or theme
   features until confirmed).
   Primary: photographer portfolio website. Also: portfolio with custom domain.
------------------------------------------------------------------------------------ */

const PATH = "/features/photographer-portfolio";
const TITLE = "Photographer Portfolio Next to Your Event Galleries | Snapdaps";
const DESCRIPTION =
  "Show your best work on a Snapdaps portfolio — on your own custom domain or a Snapdaps subdomain — right beside the event galleries you deliver.";

export const metadata = buildMetadata({
  absoluteTitle: TITLE,
  description: DESCRIPTION,
  path: PATH,
  noindex: !isIndexed(PATH),
});

export default function PhotographerPortfolioPage() {
  return (
    <>
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Features", path: "/features" },
              { name: "Portfolio", path: PATH },
            ]}
          />
        }
        title="Photographer Portfolio on Snapdaps"
        subtitle="Show your best work next to the galleries you deliver."
        body={
          <p>
            Every gallery you deliver is seen by people who might hire you next. A Snapdaps portfolio puts your best work
            in the same place, so they can see more of it.
          </p>
        }
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated={updatedOf(PATH)} />}
        visual={
          <EventPhotoHero
            photo="wedding-couple"
            alt="Bride and groom posing for a portrait"
            chips={[
              { Icon: Images, title: "Your best work", sub: "On one portfolio page" },
              { Icon: Globe, title: "Your own domain", sub: "Or a Snapdaps subdomain" },
            ]}
            align="right"
          />
        }
      />

      <UseCaseLead
        title="Snapdaps portfolio, in short"
        summary="A Snapdaps portfolio is a page where you show your best work to people looking for a photographer. Publish it on your own custom domain or on a Snapdaps subdomain, and it sits right next to the event galleries you deliver — so prospects see your style and clients get their photos in one place."
        takeaways={[
          "Show your best shoots on one page.",
          "Publish it on your own custom domain.",
          "Or use a Snapdaps subdomain — no domain to buy.",
          "Your portfolio and event galleries live together.",
        ]}
        bestFor={["Wedding photographers", "Event photographers", "Studios"]}
        scene={<LottieScene src="/animations/web-design.json" ratio="1427 / 1350" className="mx-auto max-w-md" />}
        sceneCaption="Your portfolio site under your own brand, next to the event galleries you deliver."
        tone="default"
      />

      <QuestionSection
        id="why-next-to-galleries"
        tone="panel"
        question="Why keep your portfolio next to your event galleries?"
        answer="Because the people who open your delivered galleries — guests at a wedding, colleagues at a conference — are often your next clients. When your portfolio sits beside those galleries on Snapdaps, someone who loved their photos can see more of your work straight away, without searching for you somewhere else."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Guests become prospects", body: "Everyone who finds their photos is one step away from the rest of your work." },
            { title: "One place to send people", body: "Your work and your delivered events live together on Snapdaps." },
            { title: "Your best shoots first", body: "Choose the work that shows your style, not just your latest event." },
          ].map((c) => (
            <div key={c.title} className="surface p-6">
              <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </QuestionSection>

      <QuestionSection
        id="custom-domain"
        question="Can you put your portfolio on your own domain?"
        answer="Yes. Publish your portfolio on a custom domain you already own, so it opens under your studio’s name. No domain yet? Use a Snapdaps subdomain instead — your own address on Snapdaps, with nothing to buy. Either way, your portfolio sits right beside the event galleries you deliver."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { Icon: Globe, title: "Custom domain", body: "Your portfolio on a domain you own, under your studio’s name." },
            { Icon: Link2, title: "Snapdaps subdomain", body: "Your own address on Snapdaps — no domain to buy or set up." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="surface flex flex-col gap-4 p-6">
              <span aria-hidden="true" className="icon-tile size-9">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </QuestionSection>

      <Faq items={faqs[PATH]} title="Portfolio questions" tone="panel" />

      <CtaBand title="Show your work where your clients already are" body="Deliver the event. Show the portfolio. All on Snapdaps." />
    </>
  );
}
