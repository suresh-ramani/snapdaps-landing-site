import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/blocks/cta-band";
import { Section } from "@/components/blocks/section";
import { navIcons } from "@/components/layout/nav-icons";
import { PhotoTile } from "@/components/mock/primitives";
import { useCaseNav } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

/* USE CASES HUB — links to every use-case page, grouped as in the site structure. */

export const metadata = buildMetadata({
  title: "Use cases: AI photo sharing for photographers, planners & events",
  description:
    "See how photographers, event planners, weddings, birthdays, corporate events, award ceremonies and sports tournaments use Snapdaps AI face search to share photos.",
  path: "/use-cases",
});

export default function UseCasesPage() {
  return (
    <>
      <Section
        as="h1"
        title="AI photo sharing for every event"
        intro={
          <p>
            Whether you shoot the event or run it, Snapdaps gets every guest their photos with a selfie. Pick your role
            or your event to see how.
          </p>
        }
        className="pb-0"
      />

      {useCaseNav.map((group, gi) => (
        <Section key={group.title} id={group.title.toLowerCase().replace(/\s+/g, "-")} title={group.title} className={gi === 0 ? "pt-14" : "pt-0"}>
          <ul className={gi === 0 ? "grid gap-4 md:grid-cols-2" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
            {group.links.map((l, i) => {
              const Icon = l.icon ? navIcons[l.icon] : undefined;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex h-full flex-col rounded-[1.4rem] bg-panel p-2.5 transition-colors hover:bg-accent"
                  >
                    <div className="grid grid-cols-4 gap-1.5 overflow-hidden rounded-2xl bg-card p-3" aria-hidden="true">
                      {[0, 1, 2, 3].map((k) => (
                        <PhotoTile key={k} seed={i * 4 + k + gi * 3} people={((k + i) % 3 + 1) as 1 | 2 | 3} className="aspect-square" />
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
        </Section>
      ))}

      <CtaBand title="Start delivering photos the smart way" body="Upload once. Let AI do the rest." />
    </>
  );
}
