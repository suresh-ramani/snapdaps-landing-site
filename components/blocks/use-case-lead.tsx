import Link from "next/link";
import { Check } from "lucide-react";
import { Section } from "./section";

/**
 * The lead of a use-case page, straight after the hero: a 40–60-word answer to "what does
 * Snapdaps do for this event?", 3–4 key takeaways, who the page is for, and that event's own
 * SVG scene (components/mock/event-scenes.tsx) showing where the QR code goes. Search snippets
 * and AI answers lift the summary + takeaways, so they state only real product facts.
 *
 * The editorial note under it is part of E-E-A-T: who wrote the page and the rule it follows.
 */
export function UseCaseLead({
  title,
  summary,
  takeaways,
  bestFor,
  scene,
  sceneCaption,
  tone = "panel",
}: {
  title: string;
  /** 40–60 words, complete on its own. */
  summary: string;
  takeaways: string[];
  bestFor: string[];
  scene: React.ReactNode;
  /** Says what the scene shows (the SVG itself is decorative). */
  sceneCaption: string;
  tone?: "default" | "panel";
}) {
  return (
    <Section id="in-short" tone={tone} title={title}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <p className="text-lg leading-relaxed text-foreground/85">{summary}</p>
          <h3 className="mt-8 text-lg font-semibold tracking-tight">Key takeaways</h3>
          <ul className="mt-4 space-y-3 text-[15px]">
            {takeaways.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-after text-after-ink"
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium">Best for:</span>
            {bestFor.map((b) => (
              <span key={b} className="rounded-full bg-muted/70 px-3 py-1 text-muted-foreground ring-1 ring-border">
                {b}
              </span>
            ))}
          </div>
          <p className="mt-8 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
            Written by the{" "}
            <Link href="/about#founders" className="font-medium text-foreground hover:text-primary">
              Snapdaps team
            </Link>
            . We describe only what Snapdaps does today — anything we haven’t confirmed is left out.
          </p>
        </div>
        <figure className="surface-soft rounded-2xl p-4 md:p-6">
          <div data-nosnippet>{scene}</div>
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">{sceneCaption}</figcaption>
        </figure>
      </div>
    </Section>
  );
}
