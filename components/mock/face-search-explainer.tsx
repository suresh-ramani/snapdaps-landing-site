import { Check } from "lucide-react";
import type { FaceBox } from "./detect";
import type { PhotoName } from "./photos";
import { PhotoTile, ProfilePic } from "./primitives";
import { cn } from "@/lib/utils";

/**
 * Animated explainer for AI face search on /how-it-works, with real photos, in three beats that mirror
 * the steps beside it:
 *   1. a scan line passes over the event's photos and every face gets a box (found on upload);
 *   2. the guest's selfie on the phone pulses and sends its face across (the selfie is the search);
 *   3. the guest's photos light up with a tick, the rest dim (matches in one gallery).
 *
 * The face boxes are measured on each photo (% of the 640×800 tile) — re-measure if a photo changes.
 * The selfie is an everyday portrait (`ProfilePic`), as a real guest's would be. One 9s CSS loop
 * (`.fs-*` in globals.css), transform/opacity only; under reduced motion the finished frame shows
 * (boxes off, matches ticked, the rest dimmed). Decorative: the section's text says the same thing.
 */

type Tile = { photo: PhotoName; faces: FaceBox[]; match?: boolean };

const TILES: Tile[] = [
  { photo: "wedding-couple-red", faces: [{ l: 22, t: 26.7, w: 12, h: 9.6 }, { l: 60.5, t: 25.7, w: 12, h: 9.6 }] },
  { photo: "wedding-varmala", match: true, faces: [{ l: 18.5, t: 31.8, w: 13, h: 10.4 }, { l: 52.5, t: 31.3, w: 13, h: 10.4 }] },
  {
    photo: "wedding-friends-attire",
    match: true,
    faces: [
      { l: 17.8, t: 20.4, w: 6.5, h: 5.2 },
      { l: 38.8, t: 34.4, w: 6.5, h: 5.2 },
      { l: 74.8, t: 18.9, w: 6.5, h: 5.2 },
    ],
  },
  { photo: "wedding-couple-colour", faces: [{ l: 16, t: 7.2, w: 22, h: 17.6 }, { l: 49, t: 15.2, w: 22, h: 17.6 }] },
  { photo: "wedding-bride-red", faces: [{ l: 46, t: 12.5, w: 10, h: 8 }] },
  { photo: "wedding-sangeet-dance", match: true, faces: [{ l: 47.8, t: 22.1, w: 8.5, h: 6.8 }] },
];

export function FaceSearchExplainer({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-5 sm:flex-row sm:gap-6", className)}>
      {/* The guest's phone with their selfie */}
      <div className="flex w-36 shrink-0 flex-col items-center gap-4 rounded-[1.75rem] border-[5px] border-foreground/85 bg-card px-3 pb-4 pt-6 sm:w-44">
        <p className="text-xs font-semibold sm:text-sm">Take a selfie</p>
        <div className="relative">
          <ProfilePic person="Priya" className="size-20 sm:size-24" />
          {/* Face frame corners + the pulse that says "this is the search" */}
          <span className="absolute -inset-2 rounded-xl border-2 border-dashed border-primary/60" />
          <span className="fs-ring absolute -inset-3 rounded-full border-2 border-primary" />
        </div>
        <span className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground sm:text-xs">
          Find my photos
        </span>
      </div>

      {/* Selfie → photos */}
      <div className="relative hidden h-px w-10 shrink-0 border-t-2 border-dashed border-border sm:block">
        <span className="fs-dot absolute -left-1 -top-[5px] size-2 rounded-full bg-primary" />
        <span className="fs-dot fs-dot-2 absolute -left-1 -top-[5px] size-2 rounded-full bg-primary" />
      </div>

      {/* The event's photos: scanned, faces boxed, then the guest's matches ticked */}
      <div className="relative grid w-full min-w-0 flex-1 grid-cols-3 gap-1.5 overflow-hidden rounded-xl sm:gap-2">
        {TILES.map((t, i) => (
          <div key={t.photo} className="relative">
            <PhotoTile photo={t.photo} sizes="(min-width: 1024px) 140px, 28vw" className="rounded-lg" />
            {t.faces.map((f, j) => (
              <span
                key={j}
                className={cn("fs-box absolute rounded-[3px] border-2 border-white shadow-[0_0_0_1px_var(--primary)]", i >= 3 && "fs-row-1")}
                style={{ left: `${f.l}%`, top: `${f.t}%`, width: `${f.w}%`, height: `${f.h}%` }}
              />
            ))}
            {t.match ? (
              <>
                <span className="fs-match absolute inset-0 rounded-lg ring-[3px] ring-inset ring-primary" />
                <span className="fs-check absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
              </>
            ) : (
              <span className="fs-dim absolute inset-0 rounded-lg bg-card" />
            )}
          </div>
        ))}
        <span className="fs-scan pointer-events-none absolute inset-0">
          <span className="absolute inset-x-0 top-0 h-0.5 bg-primary shadow-[0_0_12px_3px_var(--primary)]" />
        </span>
      </div>
    </div>
  );
}
