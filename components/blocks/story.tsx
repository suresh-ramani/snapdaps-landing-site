import { cn } from "@/lib/utils";

/**
 * Story-driven section (reference: reelo.io). Narrative on one side, a product / chat
 * visual on the other, closing with a power line and an emotional close.
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
  tone?: "problem" | "solution";
  reverse?: boolean;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("section-y", tone === "problem" && "bg-muted/50")}>
      <div className="container-page">
        <header className="max-w-3xl">
          <h2 id={headingId} className="text-3xl font-semibold leading-[1.1] tracking-tight md:text-[2.6rem]">
            {title}
          </h2>
          {subtitle && <h3 className="mt-4 text-lg font-normal tracking-normal text-muted-foreground md:text-xl">{subtitle}</h3>}
        </header>

        <div
          className={cn(
            "mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20",
            reverse && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div className="max-w-[var(--reading)] space-y-5 text-lg leading-[1.75] text-foreground/85 [&_.quote]:block [&_.quote]:surface [&_.quote]:px-4 [&_.quote]:py-2.5 [&_.quote]:font-medium [&_.quote]:text-foreground [&_ul]:space-y-1.5">
            {narrative}
          </div>
          {visual && <div className="lg:sticky lg:top-28">{visual}</div>}
        </div>

        {(powerLine || close) && (
          <div
            className={cn(
              "mt-14 rounded-2xl p-8 md:p-12",
              tone === "problem" ? "bg-foreground text-background" : "bg-brand-gradient text-white",
            )}
          >
            {powerLine && (
              <p className="max-w-3xl text-2xl font-semibold leading-snug tracking-tight md:text-3xl">{powerLine}</p>
            )}
            {close && <div className="mt-4 max-w-3xl space-y-2 text-lg opacity-80">{close}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
