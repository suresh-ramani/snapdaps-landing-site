import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FeatureRow = {
  id?: string;
  title: string;
  body: React.ReactNode;
  benefits?: string[];
  powerLine?: string;
  /** A "learn more" link to the feature's own page, under the copy. */
  more?: React.ReactNode;
  /**
   * A "try it" button beside the "learn more" link: the home guest-view demo (`/#try-it`) for what a
   * guest sees, or sign-up (`cta.trial.href`) for what the photographer does. Tracked by ClickTracking
   * with the row's title as `cta_location`.
   */
  tryIt?: { label: string; href: string };
  visual: React.ReactNode;
};

/**
 * Alternating text / product-visual rows. Layout after Tailark's feature blocks (MIT):
 * copy in 2 of 5 columns with a divided list; the visual sits in a soft-tinted frame
 * in the other 3 and fades out at the bottom edge, drifting up through the frame on scroll (`sd-drift`).
 */
export function FeatureRows({ rows, headingLevel = "h3" }: { rows: FeatureRow[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="flex flex-col gap-16 md:gap-28">
      {rows.map((row, i) => (
        <article key={row.title} id={row.id} className="grid scroll-mt-24 items-center gap-8 md:grid-cols-5 md:gap-14">
          <div className={cn("min-w-0 md:col-span-2", i % 2 === 1 && "md:order-2")}>
            <H className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.9rem]">{row.title}</H>
            <div className="mt-4 space-y-3 text-lg leading-relaxed text-muted-foreground">{row.body}</div>
            {row.benefits && (
              <ul className="mt-6 divide-y border-y text-[15px]">
                {row.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 py-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-purple" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {row.powerLine && <p className="mt-6 text-lg font-semibold tracking-tight">{row.powerLine}</p>}
            {(row.tryIt || row.more) && (
              <div data-track-location={row.title} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                {row.tryIt && (
                  <Button asChild>
                    <Link href={row.tryIt.href}>{row.tryIt.label}</Link>
                  </Button>
                )}
                {row.more}
              </div>
            )}
          </div>
          <div
            className={cn(
              "surface-soft relative flex min-h-80 min-w-0 items-start overflow-clip px-6 pt-8 md:col-span-3 md:px-10 md:pt-10",
              i % 2 === 1 && "md:order-1",
            )}
          >
            {/* Parallax: the product card drifts up through its frame as the row crosses the screen (sd-drift). */}
            <div className="fade-b sd-drift w-full pb-6 [--drift:1.75rem]">{row.visual}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
