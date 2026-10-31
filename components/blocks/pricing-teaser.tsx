import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Short pricing answer on the home page (AEO: "How much does Snapdaps cost?" can be answered here).
 * `fromPrice` is the cheapest paid monthly price from the live plans API, already formatted — when
 * the API is down it's omitted and the teaser still states the plan facts. Links to /pricing.
 */
export function PricingTeaser({
  fromPrice,
  trialDays,
  className,
}: {
  fromPrice?: string;
  trialDays: number;
  className?: string;
}) {
  const facts = ["Free plan to start", `${trialDays}-day free trial on paid plans`, "Monthly or yearly billing", "Cancel anytime"];
  return (
    <div className={cn("surface flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8", className)}>
      <div>
        <p className="text-lg font-semibold tracking-tight">
          {fromPrice ? (
            <>
              Paid plans from <span className="text-primary">{fromPrice}</span> a month
            </>
          ) : (
            "Simple plans for every event size"
          )}
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {facts.map((f) => (
            <li key={f} className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="size-4 text-after-ink" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <Button asChild size="lg" className="shrink-0">
        <Link href="/pricing">See all plans and prices</Link>
      </Button>
    </div>
  );
}
