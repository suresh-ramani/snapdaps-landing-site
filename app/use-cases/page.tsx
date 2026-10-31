import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { CtaBand } from "@/components/blocks/cta-band";
import { Faq } from "@/components/blocks/faq";
import { PageByline } from "@/components/blocks/page-byline";
import { QuestionSection } from "@/components/blocks/question-section";
import { Section } from "@/components/blocks/section";
import { JsonLd } from "@/components/json-ld";
import { navIcons } from "@/components/layout/nav-icons";
import { eventPhotos } from "@/components/mock/photos";
import { PhotoTile } from "@/components/mock/primitives";
import { faqs } from "@/content/faqs";
import { useCaseNav, type NavLink } from "@/content/site";
import { buildMetadata, itemListLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------------------------
   USE CASES HUB — links to every use-case page, grouped by role and by event.
   Question sections and FAQ: draft copy by Claude — not from the content doc;
   reviewed by: (pending).
   Primary: AI photo sharing for events. Also: which events, photographers vs planners.
------------------------------------------------------------------------------------ */

const PATH = "/use-cases";
const TITLE = "Use cases: AI photo sharing for photographers, planners & events";
const DESCRIPTION =
  "See how photographers, event planners, weddings, birthdays, corporate events, award ceremonies and sports tournaments use Snapdaps AI face search to share photos.";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const [byRole, byEvent] = useCaseNav;

export default function UseCasesPage() {
  return (
    <>
      <Section
        as="h1"
        title="AI photo sharing for every event"
        above={<Breadcrumbs items={[{ name: "Use cases", path: PATH }]} />}
        intro={
          <>
            <p>
              Whether you shoot the event or run it, Snapdaps gets every guest their photos with a selfie. Pick your
              role or your event to see how.
            </p>
            <PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated="2026-10-30" className="pt-2" />
          </>
        }
      />

      <QuestionSection
        id="by-role"
        question="Photographer or event planner — which page fits you?"
        answer="Choose by what you do at the event. Photographers use Snapdaps to deliver client photos the same day without sorting or sending them one by one. Event planners use it to give every guest their photos and keep the event talked about. Guests get their photos the same way in both cases: a link or QR code, then a selfie."
      >
        <UseCaseCards links={byRole.links} offset={0} className="md:grid-cols-2" />
      </QuestionSection>

      <QuestionSection
        id="by-event"
        question="Which events can you use Snapdaps for?"
        answer="Snapdaps works for any event where many people are photographed and everyone wants their own pictures: weddings and their functions, birthday parties, corporate conferences and offsites, award ceremonies and sports tournaments. Events of any size work the same way — upload the photos, share one link or QR code, and each guest finds their photos with a selfie."
        tone="panel"
      >
        <UseCaseCards links={byEvent.links} offset={3} className="sm:grid-cols-2 lg:grid-cols-3" />
      </QuestionSection>

      <Faq items={faqs[PATH]} title="Questions about use cases" />

      <CtaBand title="Start delivering photos the smart way" body="Upload once. Let AI do the rest." />

      <JsonLd data={itemListLd(useCaseNav.flatMap((g) => g.links.map((l) => ({ name: l.label, path: l.href }))))} />
    </>
  );
}

function UseCaseCards({ links, offset, className }: { links: NavLink[]; offset: number; className?: string }) {
  return (
    <ul className={cn("grid gap-4", className)}>
      {links.map((l, i) => {
        const Icon = l.icon ? navIcons[l.icon] : undefined;
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex h-full flex-col rounded-[1.4rem] bg-panel p-2.5 transition-colors hover:bg-accent"
            >
              <div className="grid grid-cols-4 gap-1.5 overflow-hidden rounded-2xl bg-card p-3" aria-hidden="true">
                {[0, 1, 2, 3].map((k) => (
                  <PhotoTile key={k} seed={i * 4 + k + offset} photo={eventPhotos[l.href]?.[k]} sizes="120px" className="aspect-square" />
                ))}
              </div>
              <div className="flex items-start justify-between gap-3 px-3 pb-3 pt-4">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold">
                    {Icon && <Icon className="size-5 text-primary" aria-hidden="true" />}
                    {l.label}
                  </h3>
                  {l.description && <p className="mt-1 text-muted-foreground">{l.description}</p>}
                </div>
                <ArrowUpRight
                  className="mt-1 size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
