import Image from "next/image";
import { Check, MessageCircle } from "lucide-react";
import { photos, type PhotoName } from "./photos";
import { PhotoTile, ProfilePic, QrPattern } from "./primitives";
import { cn } from "@/lib/utils";

/**
 * Real-photo visuals for /features/qr-code-photo-sharing (they replace the generated QR card and the
 * drawn venue scene):
 * - `QrVenueHero` — a real reception photo (real alt + priority, the LCP image) with a "Scan to find
 *   your photos" table card standing on the table, and the guest's phone showing what the scan opens.
 * - `QrPlacements` — four places the event's QR code goes, each on a real photo of that place
 *   (entrance, tables, stage screen) plus the WhatsApp invite.
 * The QR codes are the site's real code (`QrPattern`): scanning one opens https://snapdaps.ai. Sample UI is
 * aria-hidden + data-nosnippet; the page text says the same in words.
 */

export function QrVenueHero({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-md", className)}>
      <div className="glow-brand pointer-events-none absolute -inset-10 -z-10" aria-hidden="true" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-border">
        <div className="sd-rise absolute inset-0 scale-110 [--drift:1.5rem]">
          <Image
            src={photos["wedding-reception"]}
            alt="Outdoor wedding reception with draped canopies and a decorated welcome table"
            fill
            priority
            sizes="(min-width: 1024px) 28rem, 90vw"
            className="object-cover"
          />
        </div>

        {/* The table card standing on the welcome table */}
        <div aria-hidden="true" data-nosnippet className="absolute left-[38%] top-[41%] w-[21%] -rotate-2">
          <div className="flex flex-col items-center gap-1 rounded-md bg-white p-1.5 text-center shadow-[0_14px_22px_-10px_rgb(0_0_0/0.6)]">
            <QrPattern className="w-full" />
            <span className="text-[7px] font-semibold leading-tight text-neutral-900 sm:text-[8px]">Scan to find your photos</span>
          </div>
        </div>
      </div>

      {/* What the scan opens, on the guest's phone */}
      <div
        aria-hidden="true"
        data-nosnippet
        className="surface absolute -bottom-5 right-3 flex w-52 flex-col gap-2.5 p-3 sm:-right-8"
      >
        <div className="flex items-center gap-2.5">
          <ProfilePic person="Neha" className="size-9 ring-2 ring-primary ring-offset-2 ring-offset-card" />
          <span className="leading-tight">
            <span className="block text-sm font-semibold">24 photos of you</span>
            <span className="block text-xs text-muted-foreground">Found with one selfie</span>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {(["wedding-varmala", "wedding-sangeet-dance", "wedding-friends-attire"] as PhotoName[]).map((p) => (
            <div key={p} className="relative">
              <PhotoTile photo={p} sizes="64px" className="rounded-md" />
              <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-2.5" strokeWidth={3} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type Placement = { label: string; photo: PhotoName; qr: string };

/** Where the QR code sits in each photo (`qr` = position/size classes, placed by eye on the photo). */
const PLACES: Placement[] = [
  { label: "At the entrance", photo: "wedding-guests", qr: "left-[4%] top-[60%] w-[19%] -rotate-2" },
  { label: "On every table", photo: "venue-banquet", qr: "left-[42%] top-[56%] w-[20%] rotate-2" },
  { label: "On the stage screen", photo: "award-stage", qr: "left-[58%] top-[10%] w-[26%]" },
];

export function QrPlacements({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" data-nosnippet className={cn("mx-auto grid w-full max-w-md grid-cols-2 gap-3", className)}>
      {PLACES.map((p) => (
        <figure key={p.label} className="surface overflow-hidden p-1.5">
          <div className="relative overflow-hidden rounded-lg">
            <PhotoTile photo={p.photo} sizes="(min-width: 1024px) 220px, 45vw" className="aspect-[4/3] rounded-lg" />
            <span className={cn("absolute rounded-md bg-white p-1 shadow-[0_10px_18px_-8px_rgb(0_0_0/0.6)]", p.qr)}>
              <QrPattern className="w-full" />
            </span>
          </div>
          <figcaption className="px-1.5 pb-1 pt-2 text-sm font-semibold">{p.label}</figcaption>
        </figure>
      ))}

      {/* And in the invite: the same code on WhatsApp */}
      <figure className="surface flex flex-col overflow-hidden p-1.5">
        <div className="flex aspect-[4/3] flex-col justify-end gap-1.5 rounded-lg bg-[#efeae2] p-2.5">
          <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-[#d9fdd3] p-1.5 text-[10px] leading-snug text-[#111b21] shadow-sm">
            <span className="mb-1 block w-14 rounded bg-white p-1">
              <QrPattern className="w-full" />
            </span>
            Find your photos from the wedding 💛
          </div>
        </div>
        <figcaption className="flex items-center gap-1.5 px-1.5 pb-1 pt-2 text-sm font-semibold">
          <MessageCircle className="size-3.5 text-whatsapp" /> In the WhatsApp invite
        </figcaption>
      </figure>
    </div>
  );
}
