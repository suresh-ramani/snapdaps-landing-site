import { ArrowRight, ArrowDown, Check, CircleCheck, CircleX, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ComparisonRow = {
  before: string;
  after: string;
  /** Optional pictograms for the pair, e.g. Usb → QrCode. Falls back to ✕ / ✓. */
  beforeIcon?: LucideIcon;
  afterIcon?: LucideIcon;
};

/**
 * Old way vs. with Snapdaps as matched rows (layout after Tailark's comparator, MIT,
 * github.com/tailark/blocks). Each problem sits next to its fix, so readers don't have to
 * pair two separate lists in their head. Doc colours: before = soft red, after = soft green.
 *
 * Semantics: a list of pairs; each pair is read as "The old way: … With Snapdaps: …".
 */
export function ComparisonRows({
  rows,
  beforeLabel = "The old way",
  afterLabel = "With Snapdaps",
  className,
}: {
  rows: ComparisonRow[];
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("surface overflow-hidden", className)}>
      {/* Column headers (desktop) */}
      <div
        aria-hidden="true"
        className="hidden grid-cols-[1fr_3rem_1fr] items-center border-b bg-muted/40 px-6 py-3 text-sm font-medium md:grid"
      >
        <span className="flex items-center gap-2 text-before-ink">
          <CircleX className="size-4" /> {beforeLabel}
        </span>
        <span />
        <span className="flex items-center gap-2 text-after-ink">
          <CircleCheck className="size-4" /> {afterLabel}
        </span>
      </div>

      <ul className="divide-y">
        {rows.map((r) => (
          <li
            key={r.before}
            className="group grid gap-1 px-4 py-4 transition-colors hover:bg-muted/30 md:grid-cols-[1fr_3rem_1fr] md:items-center md:gap-0 md:px-6 md:py-5"
          >
            <p className="flex items-center gap-3 text-muted-foreground">
              <RowIcon icon={r.beforeIcon} tone="before" />
              <span>
                <span className="sr-only">{beforeLabel}: </span>
                <span className="decoration-before-ink/40 group-hover:line-through">{r.before}</span>
              </span>
            </p>

            <span aria-hidden="true" className="flex justify-start pl-1.5 text-muted-foreground md:justify-center md:pl-0">
              <ArrowDown className="size-3.5 md:hidden" />
              <ArrowRight className="hidden size-4 transition-transform group-hover:translate-x-0.5 md:block" />
            </span>

            <p className="flex items-center gap-3 font-medium text-foreground">
              <RowIcon icon={r.afterIcon} tone="after" />
              <span>
                <span className="sr-only">{afterLabel}: </span>
                {r.after}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Pictogram tile for one side of a row, with a small ✕ / ✓ corner badge. */
function RowIcon({ icon: Icon, tone }: { icon?: LucideIcon; tone: "before" | "after" }) {
  const isAfter = tone === "after";
  if (!Icon) {
    const Fallback = isAfter ? CircleCheck : CircleX;
    return (
      <span
        aria-hidden="true"
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full",
          isAfter ? "bg-after text-after-ink" : "bg-before text-before-ink",
        )}
      >
        <Fallback className="size-3.5" />
      </span>
    );
  }
  const Mark = isAfter ? Check : X;
  return (
    <span aria-hidden="true" className="relative shrink-0">
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-xl",
          isAfter ? "icon-tile" : "bg-before text-before-ink",
        )}
      >
        <Icon className="size-5" />
      </span>
      <span
        className={cn(
          "absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full ring-2 ring-card",
          isAfter ? "bg-after-ink text-white" : "bg-before-ink text-white",
        )}
      >
        <Mark className="size-2.5" strokeWidth={3} />
      </span>
    </span>
  );
}
