import { Check, Minus } from "lucide-react";
import { formatPrice, type Plan } from "@/lib/plans";

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

  const rows: { label: string; cell: (p: Plan) => React.ReactNode }[] = [
    { label: "Price per month (billed monthly)", cell: (p) => price(p, "monthly") },
    { label: "Price per year (billed yearly)", cell: (p) => price(p, "yearly") },
    { label: "Storage", cell: (p) => p.limits.storage },
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
            <tr key={r.label} className="border-b last:border-b-0">
              <th scope="row" className="sticky left-0 bg-card px-4 py-3 text-left font-normal text-muted-foreground">
                {r.label}
              </th>
              {plans.map((p) => (
                <td key={p.key} className="px-4 py-3 text-center font-medium tabular-nums">
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
