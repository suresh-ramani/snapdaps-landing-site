/**
 * TRUST STATISTICS — shown on the home page ("Trusted by…") and the pricing page.
 *
 * Real figures only, from Snapdaps' own data. Never estimate, round up beyond what the data
 * supports, or copy numbers from a competitor. Each figure is a claim a customer will hold us to.
 *
 * - `value` is shown exactly as written ("1.2M+", "18,400", "2 sec").
 * - Update `statsAsOf` and `statsSource` together with the numbers; the note under the figures
 *   tells visitors where they come from and when.
 * - Entries with `placeholder: true` are a layout preview: shown in `npm run dev` only, never on
 *   the live site. While no real entries exist, the stats band is hidden in production.
 */

export type Stat = {
  /** Shown as written, e.g. "1.2M+". */
  value: string;
  /** What it counts, sentence case, e.g. "Photos delivered to guests". */
  label: string;
  /** Layout preview only — dev, never production. */
  placeholder?: boolean;
};

export const stats: Stat[] = [
  // DUMMY FIGURES — made up for layout preview only. `placeholder: true` keeps them out of
  // production (and they show no source line in dev). Replace with real figures from
  // Snapdaps' own data (without `placeholder`), then delete these four.
  { placeholder: true, value: "2.4M+", label: "Photos delivered to guests" },
  { placeholder: true, value: "3,800+", label: "Events hosted" },
  { placeholder: true, value: "650+", label: "Photographers & studios" },
  { placeholder: true, value: "3 sec", label: "Average time for a guest to find their photos" },
];

/** Where the figures come from, shown under them. */
export const statsSource = "Snapdaps platform data";
/** When they were last updated, e.g. "October 2026". */
export const statsAsOf = "Placeholder month";
