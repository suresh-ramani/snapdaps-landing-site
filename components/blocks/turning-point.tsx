import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Bridge from the problem to the solution (content doc: "Mini CTA (soft push)").
 * Dark card with a soft logo-colour glow; the button scrolls to the solution section.
 */
export function TurningPoint({
  lead,
  body,
  href = "#solution",
  label = "See the smarter way",
}: {
  lead: React.ReactNode;
  body?: React.ReactNode;
  href?: string;
  label?: string;
}) {
  return (
    <div className="relative isolate mt-14 overflow-hidden rounded-3xl bg-[#09090b] px-6 py-10 text-white md:px-12 md:py-12 dark:border dark:border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-brand-violet/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-10 -z-10 size-72 rounded-full bg-brand-blue/30 blur-3xl"
      />
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="text-2xl font-semibold leading-snug tracking-tight md:text-3xl">{lead}</p>
          {body && <p className="mt-3 text-lg text-white/70">{body}</p>}
        </div>
        <Button asChild size="lg" className="shrink-0 bg-white text-[#09090b] hover:bg-white/90">
          <a href={href}>
            {label} <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
}
