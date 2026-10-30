import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { stats as allStats, statsAsOf, statsSource, type Stat } from "@/content/stats";
import { cn } from "@/lib/utils";

/**
 * Trust statistics (data in content/stats.ts): a row of figures in a hairline-divided card,
 * with a source line ("Snapdaps platform data, October 2026") so the numbers are attributed,
 * not just asserted.
 *
 * - The final numbers are in the server HTML — no count-up from 0, which would show crawlers
 *   and no-JS visitors "0". Cells fade in on scroll (Reveal `fade`; moving cells would open
 *   gaps in the hairlines).
 * - `embedded`: sits inside another <Section> (h3, no padding) — used under "Trusted by…".
 *   Otherwise it's its own band (section + h2), e.g. on /pricing. Headings are visually hidden:
 *   the figures speak for themselves.
 * - Placeholder (dummy) entries render only in dev, without a source line; with no real entries
 *   the band is hidden on the live site.
 */
export function StatsBand({
  stats = allStats,
  embedded = false,
  heading = "Snapdaps in numbers",
  className,
}: {
  stats?: Stat[];
  embedded?: boolean;
  heading?: string;
  className?: string;
}) {
  const isDev = process.env.NODE_ENV !== "production";
  const shown = isDev ? stats : stats.filter((s) => !s.placeholder);
  if (!shown.length) return null;

  const Wrapper = embedded ? "div" : "section";
  const H = embedded ? "h3" : "h2";
  const headingId = embedded ? "stats-embedded-title" : "stats-title";

  return (
    <Wrapper aria-labelledby={headingId} className={cn(!embedded && "py-12 md:py-16", className)}>
      <div className={cn(!embedded && "container-page")}>
        <H id={headingId} className="sr-only">
          {heading}
        </H>
        <RevealGroup
          as="ul"
          stagger={0.08}
          className={cn(
            "grid gap-px overflow-hidden rounded-2xl border bg-border text-center",
            shown.length >= 4 ? "grid-cols-2 lg:grid-cols-4" : shown.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
          )}
        >
          {shown.map((s) => (
            <Reveal as="li" preset="fade" key={s.label} className="flex flex-col items-center justify-center bg-card px-4 py-7 md:py-9">
              <span className="text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">{s.value}</span>
              <span className="mt-2 max-w-[16rem] text-sm text-muted-foreground">{s.label}</span>
            </Reveal>
          ))}
        </RevealGroup>
        {!shown.every((s) => s.placeholder) && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Source: {statsSource}, {statsAsOf}.
          </p>
        )}
      </div>
    </Wrapper>
  );
}
