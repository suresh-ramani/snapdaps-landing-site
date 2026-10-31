import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { photos, type PhotoName } from "@/components/mock/photos";
import { QrPattern } from "@/components/mock/primitives";
import { cn } from "@/lib/utils";

/**
 * Hero visual for a use-case page: one real event photo (credited in public/photos/CREDITS.md,
 * with real alt text and `priority`, since it's the LCP image) and small floating product chips
 * that say what Snapdaps does at that event. Each page passes its own photo, chips and QR label,
 * and `align` mirrors the layout, so no two heroes look the same.
 *
 * Chips are sample UI: aria-hidden + data-nosnippet. They sit inside the photo's box on phones
 * and hang off its edges from sm, so nothing overflows at 375px.
 */
export function EventPhotoHero({
  photo,
  alt,
  chips,
  qrLabel,
  align = "left",
}: {
  photo: PhotoName;
  alt: string;
  chips: [{ Icon: LucideIcon; title: string; sub: string }, { Icon: LucideIcon; title: string; sub: string }];
  qrLabel: string;
  align?: "left" | "right";
}) {
  const flip = align === "right";
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="glow-brand pointer-events-none absolute -inset-10 -z-10" aria-hidden="true" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-border">
        <Image
          src={photos[photo]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 28rem, 90vw"
          className="object-cover"
        />
      </div>

      <div aria-hidden="true" data-nosnippet>
        {chips.map(({ Icon, title, sub }, i) => (
          <div
            key={title}
            className={cn(
              "surface absolute flex max-w-[15rem] items-center gap-3 px-4 py-3",
              i === 0 ? "top-6" : "bottom-24",
              (i === 0) !== flip ? "left-3 sm:-left-8" : "right-3 sm:-right-8",
            )}
          >
            <span className="icon-tile size-9">
              <Icon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-tight">{title}</span>
              <span className="block text-xs text-muted-foreground">{sub}</span>
            </span>
          </div>
        ))}
        <div
          className={cn(
            "surface absolute bottom-4 flex items-center gap-3 p-2.5 pr-4",
            flip ? "left-3 sm:-left-6" : "right-3 sm:-right-6",
          )}
        >
          <QrPattern className="size-12 rounded-md" />
          <span className="text-xs font-medium leading-snug">{qrLabel}</span>
        </div>
      </div>
    </div>
  );
}
