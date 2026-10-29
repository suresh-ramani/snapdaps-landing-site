import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "@/content/site";
import { cn } from "@/lib/utils";

export function PricingTable() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={cn(
            "flex flex-col rounded-xl border bg-card p-8",
            plan.featured && "border-primary ring-1 ring-primary lg:-my-3 lg:py-11",
          )}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            {plan.featured && (
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                Most chosen
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
          <p className="mt-6 flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold tracking-tight">{plan.price}</span>
            {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
          </p>
          <ul className="mt-8 flex-1 space-y-3 text-[15px]">
            {plan.features.map((f, i) => (
              <li key={`${plan.name}-${i}`} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8" variant={plan.featured ? "default" : "outline"} size="lg">
            <a href={plan.cta.href}>{plan.cta.label}</a>
          </Button>
        </div>
      ))}
    </div>
  );
}
