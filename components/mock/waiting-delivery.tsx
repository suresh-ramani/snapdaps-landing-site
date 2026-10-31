import { Check, Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Face } from "./primitives";

export type WaitingDeliveryProps = {
  /** Card title in the event's words: "Wedding photos", "Stage photos"… */
  title: string;
  /** Four delivery steps; the first is done, the second is where it's stuck, the rest haven't happened. */
  steps: [string, string, string, string];
  /** Who is left waiting: "The family is still waiting", "Attendees are still waiting"… */
  waiting: string;
  className?: string;
};

/**
 * What waiting looks like, beside the problem story's power line (inside the dark `ink-card`): a
 * photo-delivery tracker in the event's own words, stuck on its second step, and the people still
 * waiting (illustrated faces, never stock people). The group chat is already beside it in the
 * story, so this card shows the delivery side instead — every use-case page passes its own copy.
 * Illustration colours on ink (amber = waiting) are allowed here (components/mock/*). Decorative:
 * the power line says the same, so it's aria-hidden + data-nosnippet. The hourglass turns and the
 * "now" dot breathes on slow CSS loops (`.wait-turn`, `.wait-dot`; still under reduced motion).
 */
export function WaitingDelivery({ title, steps, waiting, className }: WaitingDeliveryProps) {
  return (
    <div
      aria-hidden="true"
      data-nosnippet
      className={cn("w-full max-w-sm rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10", className)}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">{title}</p>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-400/15 px-2.5 py-1 text-xs font-semibold text-amber-300">
          <Hourglass className="wait-turn size-3.5" />
          Still waiting
        </span>
      </div>

      <ol className="mt-4 space-y-3">
        {steps.map((label, i) => {
          const state = i === 0 ? "done" : i === 1 ? "now" : "later";
          return (
            <li key={label} className="flex items-center gap-3 text-sm">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full",
                  state === "done" && "bg-ink-success/20 text-ink-success",
                  state === "now" && "bg-amber-400/20 text-amber-300",
                  state === "later" && "bg-white/[0.06] ring-1 ring-white/10",
                )}
              >
                {state === "done" && <Check className="size-3.5" />}
                {state === "now" && <span className="wait-dot size-2 rounded-full bg-amber-300" />}
              </span>
              <span className={state === "later" ? "text-white/40" : "text-white/90"}>{label}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="flex -space-x-2">
          {[2, 5, 1, 7].map((seed) => (
            <Face key={seed} seed={seed} className="size-7 ring-2 ring-ink-surface" />
          ))}
        </span>
        <p className="text-sm text-white/70">{waiting}</p>
      </div>
    </div>
  );
}
