import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Mark = "yes" | "partly" | "no";
type Row = { label: string; cells: [Mark, Mark, Mark, Mark]; notes?: Partial<Record<0 | 1 | 2 | 3, string>> };

const COLUMNS = ["Snapdaps", "Google Drive link", "Pendrive", "WhatsApp group"] as const;

/**
 * Snapdaps vs the usual ways photos get delivered, as a real <table> (crawlable, table-snippet
 * eligible, readable row by row by screen readers). Facts only — about Snapdaps, what the site
 * already states; about the others, how they generally work, with no claims about their limits
 * beyond that. Snapdaps' column is highlighted (`after` tint = the Snapdaps way).
 */
const ROWS: Row[] = [
  {
    label: "Each guest sees only the photos they’re in",
    cells: ["yes", "no", "no", "no"],
    notes: { 0: "AI face search from a selfie", 1: "Everyone browses the whole folder" },
  },
  {
    label: "Shared with one link or QR code",
    cells: ["yes", "yes", "no", "partly"],
    notes: { 2: "Handed over in person", 3: "Only people in the group" },
  },
  {
    label: "No app or account needed to view",
    cells: ["yes", "yes", "partly", "no"],
    notes: { 2: "Needs a computer", 3: "Needs WhatsApp" },
  },
  {
    label: "Photos organised by event and folder",
    cells: ["yes", "partly", "partly", "no"],
    notes: { 1: "Folders you set up by hand", 2: "Folders you set up by hand", 3: "One long chat" },
  },
  {
    label: "Original-quality photos",
    cells: ["yes", "yes", "yes", "partly"],
    notes: { 0: "On paid plans", 3: "Usually compressed" },
  },
];

function MarkIcon({ mark }: { mark: Mark }) {
  const Icon = mark === "yes" ? Check : mark === "no" ? X : Minus;
  return (
    <span
      className={cn(
        "inline-flex size-6 items-center justify-center rounded-full",
        mark === "yes" && "bg-after text-after-ink",
        mark === "no" && "bg-before text-before-ink",
        mark === "partly" && "bg-muted text-muted-foreground",
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      <span className="sr-only">{mark === "yes" ? "Yes" : mark === "no" ? "No" : "Partly"}</span>
    </span>
  );
}

export function DeliveryComparison({ className }: { className?: string }) {
  return (
    // `relative`: the cells' sr-only labels are absolutely positioned — without a positioned scroll box
    // they escape it and widen the page on phones.
    <div className={cn("surface relative overflow-x-auto", className)}>
      <table className="w-full min-w-[44rem] border-collapse text-sm">
        <caption className="sr-only">Snapdaps compared with a Google Drive link, a pendrive and a WhatsApp group</caption>
        <thead>
          <tr className="border-b">
            <th scope="col" className="w-[30%] px-4 py-3 text-left font-medium text-muted-foreground">
              Delivering event photos
            </th>
            {COLUMNS.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={cn("px-4 py-3 text-center font-semibold", i === 0 && "bg-after/60 text-after-ink")}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.label} className="border-b last:border-b-0">
              <th scope="row" className="px-4 py-3 text-left font-medium">
                {r.label}
              </th>
              {r.cells.map((m, i) => (
                <td key={i} className={cn("px-4 py-3 text-center align-top", i === 0 && "bg-after/40")}>
                  <MarkIcon mark={m} />
                  {r.notes?.[i as 0 | 1 | 2 | 3] && (
                    <span className="mt-1 block text-xs text-muted-foreground">{r.notes[i as 0 | 1 | 2 | 3]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
