import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { eventPhotos, type PhotoName } from "@/components/mock/photos";
import { PhotoTile } from "@/components/mock/primitives";
import { cn } from "@/lib/utils";

/**
 * "Who is Snapdaps for?" — one card per audience, straight after the home hero, so each visitor
 * jumps to the page written for them. Each card: one event photo, title, one line, a "see how" line;
 * the whole card is the link. Photos come from `eventPhotos` (same as the /use-cases hub).
 * Draft copy by Claude — not from the content doc; reviewed by: (pending).
 */

export type Audience = { title: string; body: string; href: string; cta: string; photo?: PhotoName };

const PHOTOGRAPHERS = "/use-cases/photo-sharing-app-for-photographers";
const PLANNERS = "/use-cases/photo-sharing-app-for-event-planners";
const WEDDINGS = "/use-cases/wedding-photo-sharing-app";

export const audiences: Audience[] = [
  {
    title: "Photographers & studios",
    body: "Deliver every client’s photos the same day — no sorting, no pendrive, no follow-up calls.",
    href: PHOTOGRAPHERS,
    cta: "For photographers",
    photo: eventPhotos[PHOTOGRAPHERS]?.[0],
  },
  {
    title: "Event planners",
    body: "Give every guest their photos while the event is still fresh, with one link or QR code.",
    href: PLANNERS,
    cta: "For event planners",
    photo: eventPhotos[PLANNERS]?.[0],
  },
  {
    title: "Weddings",
    body: "Guests from every function find their own photos with one selfie — no app, no login.",
    href: WEDDINGS,
    cta: "For weddings",
    photo: eventPhotos[WEDDINGS]?.[0],
  },
  {
    title: "Every other event",
    body: "Birthdays, corporate events, award nights and sports tournaments work the same way.",
    href: "/use-cases",
    cta: "All use cases",
    photo: "birthday-balloons",
  },
];

export function AudienceCards({ items = audiences, className }: { items?: Audience[]; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((a, i) => (
        <li key={a.href}>
          <Link href={a.href} className="surface group grid h-full grid-cols-[6.5rem_1fr] gap-1 p-2 transition-colors hover:bg-muted/40 sm:flex sm:flex-col">
            {/* Phones: a small photo beside the text, so four cards don't fill four screens. */}
            <PhotoTile photo={a.photo} seed={i} sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 104px" className="aspect-auto h-full min-h-32 sm:aspect-[4/3] sm:h-auto sm:min-h-0" />
            <div className="flex flex-1 flex-col px-3 pb-2 pt-2 sm:pb-3 sm:pt-4">
              <h3 className="text-lg font-semibold tracking-tight">{a.title}</h3>
              <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-muted-foreground">{a.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {a.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
