"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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
 * saving shown is the one "Save up to N% with yearly billing" badge — no per-plan % next to it.
 * Our own build of the "plan list + detail card" pattern (after Shadcn UI Kit's Pricing Table 4 —
 * a Pro block, so no code from it is used). Rows are real radio inputs (arrow keys move between
 * plans); the server renders every price into the HTML, and the popular plan (`isPopular`, Pro)
 * starts selected. Below lg the detail card follows the list.
 */
export function PricingPlans({ plans, yearlySaving }: { plans: PlanCard[]; yearlySaving: number }) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [selected, setSelected] = useState(plans.find((p) => p.popular)?.key ?? plans[0]?.key);
  const name = useId();
  const plan = plans.find((p) => p.key === selected) ?? plans[0];
  const priceOf = (p: PlanCard) => (billing === "yearly" ? p.yearly : p.monthly);
  const per = billing === "yearly" ? "year" : "month";
  const current = plan ? priceOf(plan) : undefined;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <div role="group" aria-label="Billing period" className="inline-flex rounded-full bg-muted p-1 ring-1 ring-border">
          {(["monthly", "yearly"] as const).map((b) => (
            <button
              key={b}
              type="button"
              aria-pressed={billing === b}
              onClick={() => setBilling(b)}
              className={cn(
                "rounded-full px-5 py-1.5 text-sm font-medium transition-colors",
                billing === b ? "bg-card text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {b === "monthly" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>
        {yearlySaving > 0 && (
          <p className="rounded-full bg-after px-3 py-1 text-xs font-medium text-after-ink">
            Save up to {yearlySaving}% with yearly billing
          </p>
        )}
      </div>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1.15fr_1fr]">
        {/* Every plan, one row each */}
        <fieldset className="surface overflow-hidden p-1.5">
          <legend className="sr-only">Choose a plan</legend>
          <ul className="divide-y">
            {plans.map((p) => {
              const price = priceOf(p);
              const active = p.key === plan?.key;
              const storage = p.limits.find((l) => l.label === "Storage")?.value;
              return (
                <li key={p.key} className={cn("rounded-lg", active && "bg-primary/5")}>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3.5 py-2.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
                      !active && "hover:bg-muted/60",
                    )}
                  >
                    <input
                      type="radio"
                      name={name}
                      value={p.key}
                      checked={active}
                      onChange={() => setSelected(p.key)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-full ring-1",
                        active ? "bg-primary ring-primary" : "bg-card ring-border",
                      )}
                    >
                      {active && <span className="size-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-semibold">
                        {p.name}
                        {p.popular && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                            Popular
                          </span>
                        )}
                      </span>
                      {storage && <span className="block text-xs text-muted-foreground">{storage} storage</span>}
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
                    <div className="px-3.5 pb-3 lg:hidden">
                      <Button asChild className="w-full">
                        <a href={priceOf(p)?.href ?? p.href}>{p.cta}</a>
                      </Button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </fieldset>

        {/* Selected plan */}
        {plan && (
          <div
            aria-live="polite"
            className={cn("surface flex flex-col p-6 md:p-7 lg:sticky lg:top-24", plan.popular && "ring-2 ring-primary")}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>
              {plan.popular && (
                <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
            </div>
            {plan.tagline && <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>}

            <div className="mt-5">
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

            <Button asChild size="lg" className="mt-6 w-full">
              <a href={current?.href ?? plan.href}>{plan.cta}</a>
            </Button>

            <ul className="mt-6 space-y-2.5 border-t pt-5 text-sm">
              {plan.limits.map((l) => (
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
