import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Face, PhotoTile } from "@/components/mock/primitives";
import { clients as allClients, type Client } from "@/content/clients";
import { cn } from "@/lib/utils";
import { ClientLogo } from "./logo-cloud";
import { Section } from "./section";

export type Testimonial = { quote: string; name: string; role: string; city?: string };

/**
 * Social proof (content doc, Section 4) as a bento (after Tailark's features/logo-cloud grid
 * blocks, MIT):
 * - Event wall: the event types Snapdaps is built for, each a small photo collage + emoji,
 *   linking to its use-case page.
 * - Client grid: real client logos from content/clients.ts (studios link to their Instagram).
 * - Testimonials render only when real ones are passed. Never invent quotes or numbers.
 */

const EVENTS = [
  { label: "Weddings", emoji: "💍", href: "/use-cases/wedding-photo-sharing-app", seeds: [4, 1, 0] },
  { label: "Birthday parties", emoji: "🎂", href: "/use-cases/birthday-party", seeds: [1, 5, 3] },
  { label: "Corporate events", emoji: "💼", href: "/use-cases/corporate-events", seeds: [2, 7, 5] },
  { label: "Award ceremonies", emoji: "🏆", href: "/use-cases/award-ceremony", seeds: [6, 1, 2] },
  { label: "Sports tournaments", emoji: "🏅", href: "/use-cases/sports-events", seeds: [3, 7, 0] },
] as const;

export function SocialProof({
  title,
  intro,
  builtFor = "Built for weddings, events, and high-volume photo delivery",
  clientsLabel = "Studios and brands using Snapdaps",
  clients = allClients.slice(0, 8),
  testimonials = [],
}: {
  title: string;
  intro?: string;
  builtFor?: string;
  clientsLabel?: string;
  clients?: Client[];
  testimonials?: Testimonial[];
}) {
  return (
    <Section id="trust" title={title} intro={intro} align="center">
      <div className={cn("grid gap-4 text-left", clients.length > 0 && "lg:grid-cols-[1.25fr_1fr]")}>
        {/* Event wall */}
        <div className="surface flex flex-col p-5 md:p-7">
          <h3 className="text-lg font-semibold tracking-tight">{builtFor}</h3>
          <ul className="mt-5 grid flex-1 auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-4">
            {EVENTS.map((e, i) => (
              <li key={e.label} className={cn(i === 0 && "col-span-2 sm:row-span-2")}>
                <EventTile {...e} big={i === 0} />
              </li>
            ))}
          </ul>
        </div>

        {/* Client grid */}
        {clients.length > 0 && (
          <div className="surface flex flex-col p-5 md:p-7">
            <h3 className="text-lg font-semibold tracking-tight">{clientsLabel}</h3>
            <ul className="mt-5 grid flex-1 grid-cols-2 overflow-hidden rounded-xl border [&>li]:-mb-px [&>li]:-mr-px [&>li]:border-b [&>li]:border-r">
              {clients.map((c) => (
                <li key={c.name} className="flex">
                  <ClientCell client={c} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {testimonials.length > 0 && (
        <ul className="mt-4 columns-1 gap-4 text-left md:columns-2 lg:columns-3 [&>li]:mb-4 [&>li]:break-inside-avoid">
          {testimonials.map((t, i) => (
            <li key={t.name} className="surface p-6">
              <blockquote className="text-[15px] leading-relaxed">“{t.quote}”</blockquote>
              <div className="mt-6 flex items-center gap-3">
                <Face seed={i} className="size-10" />
                <div className="text-sm">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-muted-foreground">
                    {t.role}
                    {t.city && `, ${t.city}`}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function EventTile({
  label,
  emoji,
  href,
  seeds,
  big,
}: {
  label: string;
  emoji: string;
  href: string;
  seeds: readonly number[];
  big?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-muted/50 ring-1 ring-border transition hover:bg-muted hover:ring-foreground/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {/* Photo collage: three prints that fan out on hover */}
      <div
        aria-hidden="true"
        className={cn("relative flex flex-1 justify-center px-4 pt-5", big ? "min-h-40 items-center sm:min-h-56" : "min-h-24 items-end")}
      >
        {seeds.map((s, i) => (
          <PhotoTile
            key={i}
            seed={s}
            people={(((s + i) % 3) + 1) as 1 | 2 | 3}
            className={cn(
              "-mx-2 rounded-lg shadow-[0_10px_24px_-12px_rgb(0_0_0/0.45)] ring-2 ring-card transition-transform duration-300",
              big ? "w-[34%] max-w-36" : "w-[34%]",
              i === 0 && "-rotate-6 translate-y-1 group-hover:-translate-x-1.5 group-hover:-rotate-[10deg]",
              i === 1 && "z-10 -translate-y-1 group-hover:-translate-y-2.5",
              i === 2 && "rotate-6 translate-y-1 group-hover:translate-x-1.5 group-hover:rotate-[10deg]",
            )}
          />
        ))}
        <span
          className={cn(
            "absolute left-3 top-3 flex items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-border",
            big ? "size-11 text-2xl" : "size-8 text-lg",
          )}
        >
          {emoji}
        </span>
      </div>
      <span className={cn("flex items-center justify-between gap-2 px-3.5 py-3 font-medium", big ? "text-base" : "text-sm")}>
        {label}
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
        />
      </span>
    </Link>
  );
}

function ClientCell({ client }: { client: Client }) {
  const logo = (
    <ClientLogo
      client={{ ...client, href: undefined }}
      className={cn("group-hover:opacity-100", !client.mono && "group-hover:grayscale-0 dark:group-hover:invert-0")}
    />
  );
  const cell = "group relative flex min-h-24 w-full items-center justify-center p-4 transition-colors hover:bg-muted/50";
  return client.href ? (
    <a href={client.href} target="_blank" rel="noopener noreferrer" className={cn(cell, "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring")}>
      {logo}
      <ArrowUpRight aria-hidden="true" className="absolute right-2 top-2 size-3.5 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <div className={cell}>{logo}</div>
  );
}
