import { Check, HardDrive, Minus } from "lucide-react";
import { formatPrice, type Plan } from "@/lib/plans";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
    { label: "iPhone photos without converting", cell: (p) => yes(p.limits.heic) },
    { label: "Email notifications", cell: (p) => yes(p.limits.emailNotifications) },
  ];

  return (
    // shadcn Table scrolls sideways inside the card; the card clips it to the rounded corners.
    <div className="surface overflow-hidden">
      <Table className="min-w-[56rem]">
        <TableCaption className="sr-only">Snapdaps plans compared</TableCaption>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead scope="col" className="sticky left-0 h-auto bg-muted px-4 py-3">
              Plan
            </TableHead>
            {plans.map((p) => (
              <TableHead key={p.key} scope="col" className="h-auto px-4 py-3 text-center font-semibold">
                {p.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* No row hover tint: the pinned column is opaque and wouldn't change with it. */}
          {rows.map((r) => (
            <TableRow key={r.label} className={cn("hover:bg-transparent", r.storage && "bg-primary/5 hover:bg-primary/5")}>
              <TableHead
                scope="row"
                className={cn(
                  "sticky left-0 h-auto px-4 py-3 whitespace-normal",
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
              </TableHead>
              {plans.map((p) => (
                <TableCell
                  key={p.key}
                  className={cn("px-4 py-3 text-center tabular-nums", r.key ? "text-base font-semibold" : "font-medium")}
                >
                  {r.cell(p)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
