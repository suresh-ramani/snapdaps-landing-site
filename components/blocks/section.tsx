import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "panel" | "card" | "ink";

/**
 * Vertical rhythm, container width and an accessible heading for every marketing section.
 * Use `as="h1"` only on standalone pages where the section title is the page title.
 * Tones: default (background), muted/panel (shadcn muted band), card (bordered band), ink (inverted).
 */
export function Section({
  id,
  title,
  intro,
  align = "left",
  as: Heading = "h2",
  tone = "default",
  className,
  headerClassName,
  glow = false,
  children,
}: {
  id?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  tone?: Tone;
  className?: string;
  headerClassName?: string;
  /** Soft blue → purple brand glow behind the section (logo colours). */
  glow?: boolean;
  children?: React.ReactNode;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn(
        "section-y scroll-mt-16",
        (tone === "muted" || tone === "panel") && "bg-muted/50",
        tone === "card" && "border-y bg-card",
        tone === "ink" && "bg-foreground text-background",
        glow && "relative isolate overflow-hidden",
        className,
      )}
    >
      {glow && <div aria-hidden="true" className="glow-brand pointer-events-none absolute inset-0 -z-10" />}
      <div className="container-page">
        {title && (
          <header
            className={cn("mb-12 max-w-3xl md:mb-16", align === "center" && "mx-auto text-center", headerClassName)}
          >
            <Heading
              id={headingId}
              className={cn(
                "font-semibold leading-[1.1] tracking-tight",
                Heading === "h1" ? "text-4xl md:text-6xl" : "text-3xl md:text-[2.6rem]",
              )}
            >
              {title}
            </Heading>
            {intro && (
              <div
                className={cn(
                  "mt-4 space-y-2 text-lg leading-relaxed",
                  tone === "ink" ? "text-background/70" : "text-muted-foreground",
                  align === "center" && "mx-auto max-w-2xl",
                )}
              >
                {intro}
              </div>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/** A single emphasised line under a section ("From selfie to photos — in seconds."). */
export function PowerLine({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-xl font-semibold leading-snug tracking-tight md:text-2xl", className)}>
      <span className="text-brand-gradient">{children}</span>
    </p>
  );
}
