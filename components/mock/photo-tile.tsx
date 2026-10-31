"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePhotoPool } from "./photo-pool";
import { TONES } from "./tones";
import { photos, type PhotoName } from "./photos";

/**
 * One event photo (real Unsplash photo, see ./photos.ts). `photo` picks a specific image;
 * otherwise `seed` picks from the page's photo pool (`<PhotoPool>`, e.g. birthday photos on the
 * birthday page), falling back to the wedding pool. The tone gradient shows while it loads.
 * Decorative (aria-hidden, alt=""), lazy-loaded, sized small via `sizes`.
 */
export function PhotoTile({
  seed = 0,
  photo,
  sizes = "(min-width: 768px) 160px, 120px",
  className,
  highlight = false,
  delayMs,
}: {
  seed?: number;
  /** A specific photo (e.g. per event type); otherwise picked from the page's pool by `seed`. */
  photo?: PhotoName;
  /** next/image `sizes` — keep it close to the rendered size so small tiles stay light. */
  sizes?: string;
  className?: string;
  /** @deprecated Ignored since tiles became real photos; kept so existing callers still type-check. */
  people?: 0 | 1 | 2 | 3;
  highlight?: boolean;
  /** Animation delay, for staggered entrances. */
  delayMs?: number;
}) {
  const pool = usePhotoPool();
  const [a, b] = TONES[seed % TONES.length];
  const src = photos[photo ?? pool[seed % pool.length]];
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-md",
        highlight && "ring-2 ring-primary ring-offset-2 ring-offset-card",
        className,
      )}
      style={{
        background: `linear-gradient(160deg, ${a}, ${b})`,
        ...(delayMs !== undefined ? { animationDelay: `${delayMs}ms` } : {}),
      }}
    >
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
      {highlight && (
        <span className="absolute left-1.5 top-1.5 size-2.5 rounded-full border-2 border-white bg-primary" />
      )}
    </div>
  );
}
