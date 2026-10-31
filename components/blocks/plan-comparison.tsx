import { Check, HardDrive, Minus } from "lucide-react";
import { formatPrice, type Plan } from "@/lib/plans";
import { cn } from "@/lib/utils";

/**
 * Every plan against every limit and price, as a real <table> (crawlable, readable by screen
 * readers row by row). Scrolls sideways on small screens with the feature column pinned.
 */
export function PlanComparison({ plans }: { plans: Plan[] }) {
  const price = (p: Plan, b: "monthly" | "yearly") => {
    const x = p[b];
    if (p.free) return "₹0";
    return x ? formatPrice(x.price, p.currency) : "—";
  };
  const yes = (v: boolean) =>
    v ? (
      <Check className="mx-auto size-4 text-after-ink" aria-label="Included" />
    ) : (
      <Minus className="mx-auto size-4 text-muted-foreground" aria-label="Not included" />
    );

  // Storage and price lead and stand out — they're what people compare plans on.
  const rows: { label: string; cell: (p: Plan) => React.ReactNode; key?: boolean; storage?: boolean }[] = [
    { label: "Storage", cell: (p) => p.limits.storage, key: true, storage: true },
    { label: "Price per month (billed monthly)", cell: (p) => price(p, "monthly"), key: true },
    { label: "Price per year (billed yearly)", cell: (p) => price(p, "yearly"), key: true },
    { label: "Events", cell: (p) => p.limits.events },
    { label: "Max photo size", cell: (p) => p.limits.maxUpload },
    { label: "AI face search", cell: (p) => p.limits.faceSearch },
    { label: "Original-quality photos", cell: (p) => yes(p.limits.originalQuality) },
    { label: "Apple HEIC photos", cell: (p) => yes(p.limits.heic) },
    { label: "Email notifications", cell: (p) => yes(p.limits.emailNotifications) },
  ];

  return (
    <div className="surface overflow-x-auto">
      <table className="w-full min-w-[56rem] border-collapse text-sm">
        <caption className="sr-only">Snapdaps plans compared</caption>
        <thead>
          <tr className="border-b bg-muted/40">
            <th scope="col" className="sticky left-0 bg-muted px-4 py-3 text-left font-medium">
              Plan
            </th>
            {plans.map((p) => (
              <th key={p.key} scope="col" className="px-4 py-3 text-center font-semibold">
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className={cn("border-b last:border-b-0", r.storage && "bg-primary/5")}>
              <th
                scope="row"
                className={cn(
                  "sticky left-0 px-4 py-3 text-left",
                  // Opaque so scrolled cells never show through the pinned column.
                  r.storage ? "bg-[color-mix(in_oklab,var(--primary)_5%,var(--card))]" : "bg-card",
                  r.key ? "font-semibold text-foreground" : "font-normal text-muted-foreground",
                )}
              >
                {r.storage ? (
                  <span className="inline-flex items-center gap-2">
                    <HardDrive className="size-4 text-primary" aria-hidden="true" />
                    {r.label}
                  </span>
                ) : (
                  r.label
                )}
              </th>
              {plans.map((p) => (
                <td
                  key={p.key}
                  className={cn("px-4 py-3 text-center tabular-nums", r.key ? "text-base font-semibold" : "font-medium")}
                >
                  {r.cell(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
