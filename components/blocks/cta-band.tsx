import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/demo/book-demo";
import { cta } from "@/content/site";

/**
 * Closing CTA (Tailark call-to-action style, MIT): centred, generous whitespace, on a
 * muted surface with a faint grid. Every page passes its own heading/body from the doc.
 */
export function CtaBand({
  title,
  body,
  primaryLabel = cta.trial.label,
  secondaryLabel = cta.demo.label,
  trustLine = cta.trustLine,
}: {
  title: React.ReactNode;
  body?: React.ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  trustLine?: readonly string[];
}) {
  return (
    <section aria-labelledby="cta-title" className="section-y">
      <div className="container-page">
        <div className="surface-soft relative overflow-hidden px-6 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_75%)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-title" className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {title}
            </h2>
            {body && <p className="mt-5 text-lg text-muted-foreground">{body}</p>}
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <a href={cta.trial.href}>{primaryLabel}</a>
              </Button>
              <BookDemoButton label={secondaryLabel} variant="outline" className="bg-background" />
            </div>
            <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {trustLine.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="size-4 text-after-ink" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Soft inline CTA between sections ("Ready to switch to smarter photo delivery?"). */
export function MiniCta({
  lead,
  label = "Try Snapdaps now",
  children,
}: {
  lead: React.ReactNode;
  label?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="surface mt-14 flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center md:p-8">
      <div>
        <p className="text-xl font-semibold tracking-tight md:text-2xl">{lead}</p>
        {children && <div className="mt-2 text-muted-foreground">{children}</div>}
      </div>
      <Button asChild size="lg" className="shrink-0">
        <a href={cta.trial.href}>{label}</a>
      </Button>
    </div>
  );
}
