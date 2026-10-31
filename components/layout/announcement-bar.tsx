import Link from "next/link";
import { ArrowRight, Megaphone, Rocket, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { endsLabel } from "@/components/blocks/offer-callout";
import { cn } from "@/lib/utils";
import { getAnnouncement } from "@/lib/wp/api";
import type { Announcement } from "@/lib/wp/types";
import { AnnouncementDismiss } from "./announcement-dismiss";
import { ANNOUNCEMENT_KEY } from "./announcement-key";

const styles: Record<Announcement["style"], { bar: string; Icon: typeof Megaphone }> = {
  info: { bar: "bg-muted text-foreground border-b", Icon: Megaphone },
  offer: { bar: "bg-primary text-primary-foreground", Icon: Tag },
  launch: { bar: "bg-foreground text-background", Icon: Rocket },
};

/**
 * Announcement bar above the header on every page, managed in WordPress → Settings → Announcement
 * (see README). Server-rendered, so it's in the HTML with no layout shift; renders nothing when the
 * announcement is off, empty or outside its dates. It scrolls away with the page (only the header is
 * sticky). A visitor's dismissal is remembered per announcement id; the inline script hides a
 * dismissed bar before first paint, so it never flashes. Plain text, not a heading — it must not
 * compete with each page's H1.
 */
export async function AnnouncementBar() {
  const a = await getAnnouncement();
  if (!a) return null;
  const { bar, Icon } = styles[a.style];

  return (
    <>
      {/* suppressHydrationWarning: the inline script below may set `hidden` before React hydrates. */}
      <div
        id="announcement"
        role="region"
        aria-label="Announcement"
        suppressHydrationWarning
        className={cn("relative print:hidden", bar)}
      >
        <div className="container-page flex min-h-10 items-center gap-3 py-2 text-sm">
          <p className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
            <span className="inline-flex items-center gap-2">
              <Icon className="size-4 shrink-0 opacity-80" aria-hidden="true" />
              <span className="font-medium">{a.message}</span>
            </span>
            {a.link &&
              (a.link.external ? (
                <a
                  href={a.link.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:no-underline"
                >
                  {a.link.label} <ArrowRight className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  href={a.link.href}
                  className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:no-underline"
                >
                  {a.link.label} <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              ))}
          </p>
          <AnnouncementDismiss id={a.id} />
        </div>
      </div>
      <script
        // Runs while the HTML is parsed: hides the bar before paint if this announcement was dismissed.
        dangerouslySetInnerHTML={{
          __html: `try{if(localStorage.getItem(${JSON.stringify(ANNOUNCEMENT_KEY)})===${JSON.stringify(a.id)})document.getElementById("announcement").hidden=true}catch(e){}`,
        }}
      />
    </>
  );
}

/** Whether the home hero shows the pill: Style Launch or Offer, "home hero" ticked, and a link. */
export const showsHeroPill = (a: Announcement | null): a is Announcement & { link: NonNullable<Announcement["link"]> } =>
  Boolean(a && a.onHero && (a.style === "launch" || a.style === "offer") && a.link);

/** Small pill above the home hero headline for a launch ("New") or an offer ("Offer") — render only when
 * `showsHeroPill`. Its badge has a slow CSS light sweep (`.badge-shine`) — the only animated part of any
 * announcement. */
export function AnnouncementPill({ announcement: a }: { announcement: Announcement & { link: NonNullable<Announcement["link"]> } }) {
  const inner = (
    <>
      <span className="badge-shine rounded-full bg-brand-gradient px-2 py-0.5 text-xs font-semibold text-white">
        {a.style === "offer" ? "Offer" : "New"}
      </span>
      <span className="truncate">{a.message}</span>
      <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
    </>
  );
  const cls =
    "inline-flex max-w-full items-center gap-2 rounded-full bg-card py-1 pl-1 pr-3 text-sm font-medium ring-1 ring-border transition-colors hover:bg-muted";
  return a.link.external ? (
    <a href={a.link.href} target="_blank" rel="noopener" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={a.link.href} className={cls}>
      {inner}
    </Link>
  );
}

const cardStyles: Record<Announcement["style"], { label: string; card: string; tag: string; Icon: typeof Megaphone }> = {
  offer: { label: "Offer", card: "bg-primary/5 ring-1 ring-primary/25", tag: "bg-primary text-primary-foreground", Icon: Tag },
  launch: { label: "New", card: "surface", tag: "bg-brand-gradient text-white", Icon: Rocket },
  info: { label: "Update", card: "surface", tag: "bg-muted text-foreground ring-1 ring-border", Icon: Megaphone },
};

/**
 * The current announcement as a small card, for sidebars (blog posts). Same source and rules as the
 * bar (WordPress → Settings → Announcement); any style. Renders nothing when there's no announcement.
 * Not dismissible — it's quiet and in the sidebar, not across the page.
 */
export async function AnnouncementCard({ className }: { className?: string }) {
  const a = await getAnnouncement();
  if (!a) return null;
  const { label, card, tag, Icon } = cardStyles[a.style];
  const ends = a.style === "offer" ? endsLabel(a.endsAt) : null;
  const linkCls = "mt-4 w-full";

  return (
    <aside aria-label="Announcement" className={cn("rounded-xl p-5", card, className)}>
      <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold", tag)}>
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </span>
      <p className="mt-3 font-semibold leading-snug tracking-tight">{a.message}</p>
      {ends && <p className="mt-1 text-sm text-muted-foreground">{ends}</p>}
      {a.link && (
        <Button asChild size="sm" variant={a.style === "info" ? "outline" : "default"} className={linkCls}>
          {a.link.external ? (
            <a href={a.link.href} target="_blank" rel="noopener">
              {a.link.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link href={a.link.href}>{a.link.label}</Link>
          )}
        </Button>
      )}
    </aside>
  );
}
