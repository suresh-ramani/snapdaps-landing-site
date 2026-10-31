import { WaitingDelivery, type WaitingDeliveryProps } from "@/components/mock/waiting-delivery";
import { cn } from "@/lib/utils";

/**
 * Story-driven section (reference: reelo.io). Narrative on one side, a product / chat
 * visual on the other, closing with a power line and an emotional close. On the problem tone that
 * close is the page's dark `ink-card` moment, with `waiting` (a `WaitingDelivery` tracker in the event's
 * words) or `powerVisual` beside it.
 * `narrative` is free-form JSX so each page keeps the doc's line breaks exactly.
 */
export function Story({
  id,
  title,
  subtitle,
  narrative,
  powerLine,
  close,
  visual,
  waiting,
  powerVisual,
  tone = "problem",
  reverse = false,
}: {
  id?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  narrative: React.ReactNode;
  powerLine?: React.ReactNode;
  close?: React.ReactNode;
  visual?: React.ReactNode;
  /** Problem tone: the stuck photo-delivery tracker beside the power line, in this event's words. */
  waiting?: WaitingDeliveryProps;
  /** Problem tone: any other visual beside the power line (instead of `waiting`). */
  powerVisual?: React.ReactNode;
  tone?: "problem" | "solution";
  reverse?: boolean;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      data-tone={tone === "problem" ? "panel" : "default"}
      className={cn("section-y", tone === "problem" && "bg-muted/50")}
    >
      <div className="container-page">
        <header className="max-w-3xl">
          <h2 id={headingId} className="text-3xl font-semibold leading-[1.1] tracking-tight md:text-[2.6rem]">
            {title}
          </h2>
          {subtitle && <h3 className="mt-4 text-lg font-normal tracking-normal text-muted-foreground md:text-xl">{subtitle}</h3>}
        </header>

        {/* One grid for the whole story. Desktop: narrative, then the power-line card, in one column; the
            visual's column spans both rows, so its sticky phone holds for the whole story (even when the
            narrative is shorter than the phone). Phone/tablet: the visual comes first, shrunk, pinned under
            the header on an opaque band (the section's own colour) while the story scrolls beneath it. */}
        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-x-20 lg:gap-y-14">
          <div
            className={cn(
              "max-w-[var(--reading)] space-y-5 text-lg leading-[1.75] text-foreground/85 [&_.quote]:block [&_.quote]:surface [&_.quote]:px-4 [&_.quote]:py-2.5 [&_.quote]:font-medium [&_.quote]:text-foreground [&_ul]:space-y-1.5",
              "lg:row-start-1",
              reverse ? "lg:col-start-2" : "lg:col-start-1",
            )}
          >
            {narrative}
          </div>

          {visual && (
            <div
              className={cn(
                "sticky top-16 z-10 order-first -mx-5 px-5 pb-5 pt-3 md:-mx-8 md:px-8",
                "lg:static lg:order-none lg:row-span-2 lg:row-start-1 lg:mx-0 lg:self-stretch lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0",
                reverse ? "lg:col-start-1" : "lg:col-start-2",
                tone === "problem" ? "bg-[color-mix(in_oklab,var(--muted)_50%,var(--background))]" : "bg-background",
              )}
            >
              <div className="mx-auto max-w-sm max-lg:[zoom:0.62] lg:sticky lg:top-28 lg:max-w-none">{visual}</div>
            </div>
          )}

          {(powerLine || close) &&
            (tone === "problem" ? (
              // The site's one dark moment (ink-card, logo-colour glows): the power line, then what waiting
              // looks like (a delivery stuck on editing, messages piling up) — side by side when wide enough.
              <div
                className={cn(
                  "@container relative isolate overflow-hidden ink-card px-6 py-10 md:px-10 md:py-12",
                  visual ? cn("lg:row-start-2", reverse ? "lg:col-start-2" : "lg:col-start-1") : "lg:col-span-2",
                )}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-brand-violet/30 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-28 left-10 -z-10 size-72 rounded-full bg-brand-blue/25 blur-3xl"
                />
                <div className="grid items-center gap-10 @3xl:grid-cols-[1.35fr_1fr] @3xl:gap-14">
                  <div>
                    {powerLine && (
                      <p className="text-2xl font-semibold leading-snug tracking-tight md:text-3xl">{powerLine}</p>
                    )}
                    {close && <div className="mt-5 space-y-2 text-lg text-white/70 [&_.font-semibold]:text-white">{close}</div>}
                  </div>
                  {(waiting || powerVisual) && (
                    <div className="flex justify-center @3xl:justify-end">
                      {waiting ? <WaitingDelivery {...waiting} /> : powerVisual}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "rounded-2xl bg-brand-gradient p-8 text-white md:p-12",
                  visual ? cn("lg:row-start-2", reverse ? "lg:col-start-2" : "lg:col-start-1") : "lg:col-span-2",
                )}
              >
                {powerLine && <p className="text-2xl font-semibold leading-snug tracking-tight md:text-3xl">{powerLine}</p>}
                {close && <div className="mt-4 space-y-2 text-lg opacity-80">{close}</div>}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
