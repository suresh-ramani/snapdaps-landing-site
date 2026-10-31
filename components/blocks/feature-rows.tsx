import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeatureRow = {
  id?: string;
  title: string;
  body: React.ReactNode;
  benefits?: string[];
  powerLine?: string;
  /** A "learn more" link to the feature's own page, under the copy. */
  more?: React.ReactNode;
  visual: React.ReactNode;
};

/**
 * Alternating text / product-visual rows. Layout after Tailark's feature blocks (MIT):
 * copy in 2 of 5 columns with a divided list; the visual sits in a soft-tinted frame
 * in the other 3 and fades out at the bottom edge.
 */
export function FeatureRows({ rows, headingLevel = "h3" }: { rows: FeatureRow[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="flex flex-col gap-16 md:gap-28">
      {rows.map((row, i) => (
        <article key={row.title} id={row.id} className="grid scroll-mt-24 items-center gap-8 md:grid-cols-5 md:gap-14">
          <div className={cn("md:col-span-2", i % 2 === 1 && "md:order-2")}>
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
            {row.more && <div className="mt-5">{row.more}</div>}
          </div>
          <div
            className={cn(
              "surface-soft relative flex min-h-80 items-start overflow-hidden px-6 pt-8 md:col-span-3 md:px-10 md:pt-10",
              i % 2 === 1 && "md:order-1",
            )}
          >
            <div className="fade-b w-full pb-6">{row.visual}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
