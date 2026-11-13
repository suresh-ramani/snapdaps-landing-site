"use client";

import { useState } from "react";
import { Check, HardDrive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

/** A plan as the pricing UI needs it — built on the server from lib/plans.ts (prices already formatted). */
export type PlanCard = {
  key: string;
  name: string;
  popular: boolean;
  free: boolean;
  tagline: string;
  limits: { label: string; value: string }[];
  extras: string[];
  monthly?: { regular: string; price: string; href: string };
  yearly?: { regular: string; price: string; perMonth: string; href: string };
  /** Fallback when the current billing period has no price. */
  href: string;
  cta: string;
};

/**
 * Pricing that fits the first screen: a Monthly / Yearly switch, then every plan as one compact row
 * (name, storage, price) next to a detail card for the selected plan (price, limits, button). The only
 * saving shown is "Save up to N%" inside the Yearly button — no per-plan % next to it.
 * Our own build of the "plan list + detail card" pattern (after Shadcn UI Kit's Pricing Table 4 —
 * a Pro block, so no code from it is used). Monthly / Yearly is a shadcn ToggleGroup and the rows a
 * shadcn RadioGroup (arrow keys move between periods and plans); the server renders every price into the HTML, and the popular plan (`isPopular`, Pro)
 * starts selected. Below lg the detail card follows the list.
 */
export function PricingPlans({ plans, yearlySaving }: { plans: PlanCard[]; yearlySaving: number }) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [selected, setSelected] = useState(plans.find((p) => p.popular)?.key ?? plans[0]?.key);
  const plan = plans.find((p) => p.key === selected) ?? plans[0];
  const priceOf = (p: PlanCard) => (billing === "yearly" ? p.yearly : p.monthly);
  const per = billing === "yearly" ? "year" : "month";
  const current = plan ? priceOf(plan) : undefined;
  const planStorage = plan?.limits.find((l) => l.label === "Storage")?.value;

  return (
    <div className="mx-auto max-w-5xl">
      {/* Billing switch in white and brand blue: the chosen period is solid blue, the other is blue text on
          white (clearly a button), and Yearly carries its saving, so the cheaper option is hard to miss. */}
      <div className="flex justify-center">
        <ToggleGroup
          type="single"
          spacing={1}
          value={billing}
          // A single toggle group can be emptied by clicking the chosen item again; keep one period chosen.
          onValueChange={(v) => {
            if (v !== "monthly" && v !== "yearly") return;
            setBilling(v);
            track("select_billing", { billing: v });
          }}
          aria-label="Billing period"
          className="rounded-full bg-card p-1 shadow-sm ring-1 ring-primary/30"
        >
          {(["monthly", "yearly"] as const).map((b) => (
            <ToggleGroupItem
              key={b}
              value={b}
              className="group/billing h-auto rounded-full px-5 py-2 font-semibold text-primary hover:bg-primary/10 hover:text-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-sm"
            >
              {b === "monthly" ? "Monthly" : "Yearly"}
              {b === "yearly" && yearlySaving > 0 && (
                <Badge className="bg-primary/10 font-semibold text-primary ring-1 ring-primary/25 group-data-[state=on]/billing:bg-white/20 group-data-[state=on]/billing:text-primary-foreground group-data-[state=on]/billing:ring-0">
                  Save up to {yearlySaving}%
                </Badge>
              )}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1.15fr_1fr]">
        {/* Every plan, one row each */}
        <RadioGroup
          value={plan?.key}
          onValueChange={(key) => {
            setSelected(key);
            track("select_plan", { plan: key, billing });
          }}
          aria-label="Choose a plan"
          className="surface block overflow-hidden p-1.5"
        >
          <ul className="divide-y">
            {plans.map((p) => {
              const price = priceOf(p);
              const active = p.key === plan?.key;
              const storage = p.limits.find((l) => l.label === "Storage")?.value;
              return (
                <li key={p.key} className={cn("rounded-lg", active && "bg-primary/5")}>
                  <label
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3.5 py-2.5 transition-colors",
                      !active && "hover:bg-muted/60",
                    )}
                  >
                    <RadioGroupItem value={p.key} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-semibold">
                        {p.name}
                        {p.popular && (
                          <Badge className="text-[11px] font-semibold">Popular</Badge>
                        )}
                      </span>
                      <span className="mt-1 flex flex-wrap gap-1.5">
                        {storage && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-card px-1.5 py-0.5 text-xs font-semibold tabular-nums ring-1 ring-border">
                            <HardDrive className="size-3 text-primary" aria-hidden="true" />
                            {storage}
                            <span className="font-normal text-muted-foreground">storage</span>
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="text-right">
                      {p.free ? (
                        <span className="text-lg font-semibold">₹0</span>
                      ) : price ? (
                        <>
                          {price.regular !== price.price && (
                            <s className="block text-xs text-muted-foreground">{price.regular}</s>
                          )}
                          <span className="text-lg font-semibold tabular-nums">{price.price}</span>
                          <span className="text-xs text-muted-foreground">/{per === "year" ? "yr" : "mo"}</span>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </span>
                  </label>
                  {/* Below lg the detail card is under the whole list, so the chosen row carries its own button. */}
                  {active && (
                    <div className="px-3.5 pb-3 lg:hidden" data-track-location="pricing plans" data-track-plan={p.key} data-track-billing={billing}>
                      <Button asChild className="w-full">
                        <a href={priceOf(p)?.href ?? p.href}>{p.cta}</a>
                      </Button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </RadioGroup>

        {/* Selected plan */}
        {plan && (
          <div
            aria-live="polite"
            className={cn("surface flex flex-col p-6 md:p-7 lg:sticky lg:top-24", plan.popular && "ring-2 ring-primary")}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>
              {plan.popular && (
                <Badge className="px-3 font-semibold">Most popular</Badge>
              )}
            </div>
            {plan.tagline && <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>}

            {/* Price and storage side by side — the two things people compare plans on. */}
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                {plan.free ? (
                  <p className="text-4xl font-semibold tracking-tight">₹0</p>
                ) : current ? (
                  <>
                    {current.regular !== current.price && (
                      <p className="text-sm text-muted-foreground">
                        <s>{current.regular}</s>
                      </p>
                    )}
                    <p className="mt-0.5 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight tabular-nums">{current.price}</span>
                      <span className="text-sm text-muted-foreground">/{per}</span>
                    </p>
                    {billing === "yearly" && plan.yearly && (
                      <p className="mt-1 text-xs text-muted-foreground">≈ {plan.yearly.perMonth}/month, billed yearly</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Not available {billing === "yearly" ? "yearly" : "monthly"}</p>
                )}
              </div>
              {planStorage && (
                <div className="flex items-center gap-2.5 rounded-xl bg-muted/50 px-3 py-2 ring-1 ring-border">
                  <span aria-hidden="true" className="icon-tile size-8">
                    <HardDrive className="size-4" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-lg font-semibold tabular-nums">{planStorage}</span>
                    <span className="block text-xs text-muted-foreground">storage</span>
                  </span>
                </div>
              )}
            </div>

            <Button asChild size="lg" className="mt-6 w-full">
              <a
                href={current?.href ?? plan.href}
                data-track-location="pricing plans"
                data-track-plan={plan.key}
                data-track-billing={billing}
              >
                {plan.cta}
              </a>
            </Button>

            <Separator className="mt-6" />
            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              {plan.limits.filter((l) => l.label !== "Storage").map((l) => (
                <li key={l.label} className="flex items-baseline justify-between gap-3">
                  <span className="text-muted-foreground">{l.label}</span>
                  <span className="font-medium">{l.value}</span>
                </li>
              ))}
              {plan.extras.map((e) => (
                <li key={e} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-after-ink" aria-hidden="true" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
