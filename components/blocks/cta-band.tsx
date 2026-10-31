import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/demo/book-demo";
import { OldWaySwap } from "@/components/mock/old-way-swap";
import { cta } from "@/content/site";

/**
 * Closing CTA: dark brand card (split layout after Tailark's call-to-action blocks, MIT).
 * Copy + buttons on the left; on the right the old delivery methods (pendrive, Drive,
 * WhatsApp, WeTransfer) get crossed out and replaced by one Snapdaps QR card.
 * Every page passes its own heading/body from the doc.
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
    <section aria-labelledby="cta-title" data-tone="default" className="section-y">
      <div className="container-page">
        <div className="relative isolate overflow-hidden ink-card px-6 py-14 md:px-12 md:py-16 lg:px-16">
          {/* Logo-colour glows + a faint grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-32 -z-10 size-[28rem] rounded-full bg-brand-blue/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 right-0 -z-10 size-[30rem] rounded-full bg-brand-violet/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_70%_at_30%_40%,#000_10%,transparent_75%)]"
          />

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="text-center lg:text-left">
              <h2 id="cta-title" className="text-3xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
                {title}
              </h2>
              {body && <p className="mx-auto mt-5 max-w-xl text-lg text-white/70 lg:mx-0">{body}</p>}
              <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Button asChild size="lg" className="bg-white text-ink-surface hover:bg-white/90">
                  <a href={cta.trial.href}>{primaryLabel}</a>
                </Button>
                <BookDemoButton
                  label={secondaryLabel}
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                />
              </div>
              <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/65 lg:justify-start">
                {trustLine.map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check className="size-4 text-ink-success" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <OldWaySwap />
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
