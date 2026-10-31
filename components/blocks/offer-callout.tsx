import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Announcement } from "@/lib/wp/types";

/**
 * "Ends 10 Nov" — the date exactly as the editor typed it in WordPress. `endsAt` is ISO 8601 in the
 * WordPress site's timezone (e.g. 2026-11-10T23:59:00+00:00), so read its date part as-is instead of
 * converting it (a UTC-set WordPress would otherwise show the next day in India). The year shows only
 * when it isn't this year.
 */
export function endsLabel(iso?: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? "");
  if (!m) return null;
  const [year, month, day] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(year, month - 1, day));
  return `Ends ${date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    ...(year === new Date().getFullYear() ? {} : { year: "numeric" }),
    timeZone: "UTC",
  })}`;
}

/** True when the announcement is a live offer (Settings → Announcement, Style: Offer). */
export const isOffer = (a: Announcement | null): a is Announcement => a?.style === "offer";

/**
 * The current offer as one slim strip right under the pricing page's headline — where visitors look
 * first — kept small so the plans still fit the first screen. Fed by WordPress → Settings →
 * Announcement (Style: Offer), so it appears and disappears with the bar and its dates. Real offers
 * only: no countdown timers or invented urgency.
 */
export function OfferStrip({ offer, className }: { offer: Announcement; className?: string }) {
  const ends = endsLabel(offer.endsAt);
  const linkCls = "inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline";
  return (
    <aside
      aria-label="Current offer"
      className={cn(
        "mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl bg-primary/5 px-4 py-2 text-center text-sm ring-1 ring-primary/25 sm:rounded-full",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 font-medium">
        <Tag className="size-4 shrink-0 text-primary" aria-hidden="true" />
        {offer.message}
      </span>
      {ends && <span className="text-muted-foreground">{ends}</span>}
      {offer.link &&
        (offer.link.external ? (
          <a href={offer.link.href} target="_blank" rel="noopener" className={linkCls}>
            {offer.link.label} <ArrowRight className="size-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <Link href={offer.link.href} className={linkCls}>
            {offer.link.label} <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        ))}
    </aside>
  );
}

/** The same offer as one short line, for under a CTA's buttons (dark CtaBand). */
export function OfferNote({ offer }: { offer: Announcement }) {
  const ends = endsLabel(offer.endsAt);
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 lg:justify-start">
      <Tag className="size-4" aria-hidden="true" />
      <span className="font-medium">{offer.message}</span>
      {ends && <span className="text-white/60">· {ends}</span>}
    </p>
  );
}
