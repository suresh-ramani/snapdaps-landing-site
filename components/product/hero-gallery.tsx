"use client";

import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEventSample } from "@/components/mock/photo-pool";
import { BrowserFrame, PhotoTile, ProfilePic, QrPattern } from "@/components/mock/primitives";
import { GUEST_SELFIE_SEED } from "@/components/mock/profiles";
import { cn } from "@/lib/utils";

/**
 * Home hero visual: one guest's view of the event page, in a single browser window — their selfie,
 * "38 photos found" and the photos they're in, under the event's folder filter. One window with one focal moment (the match), framed
 * the stageshow way (.claude/skills/stageshow): no plate behind it, wide enough to read, cropped by
 * a fade at the bottom so it runs out of the hero instead of floating with even margins.
 * Sample data only: decorative, inert, aria-hidden + data-nosnippet. Eight tiles = the eight photos
 * in the page's pool, so no photo repeats.
 *
 * Depth on scroll (CSS scroll-driven, `sd-*` in globals.css): the window lies back slightly at the
 * top of the page and flattens as you scroll (`sd-tilt`), while two chips beside it (lg+) rise at
 * their own speeds (`sd-rise`), so the window and chips read as layers. Resting state without
 * support or under reduced motion: flat window, chips in place.
 */
export function HeroGallery({ className }: { className?: string }) {
  const sample = useEventSample();
  const folders = ["All", ...sample.folders];
  return (
    <div
      aria-hidden="true"
      data-nosnippet
      inert
      className={cn("pointer-events-none relative mx-auto max-w-4xl select-none", className)}
    >
      {/* Padding leaves room for the window's shadow inside the mask; the mask fades the bottom out. */}
      <div className="px-2 pt-2 [mask-image:linear-gradient(to_bottom,black_65%,transparent)] sm:px-6">
      <div className="sd-tilt">
      <BrowserFrame url={`snapdaps.ai/e/${slug(sample.name)}`} className="max-h-[28rem] md:max-h-[34rem]">
        {/* The guest: selfie, result, download */}
        <div className="flex items-center gap-4 border-b px-4 py-4 md:px-6">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-card [--scan-distance:3rem] md:size-14 md:[--scan-distance:3.5rem]">
            <ProfilePic seed={GUEST_SELFIE_SEED} className="size-full rounded-none" />
            <span className="animate-scan absolute inset-x-0 top-0 h-0.5 bg-primary shadow-[0_0_10px_2px_var(--primary)]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-muted-foreground">{sample.name}</p>
            <p className="text-lg font-semibold tracking-tight">38 photos found</p>
          </div>
          <Button size="sm">
            <Download /> <span className="max-sm:sr-only">Download all</span>
          </Button>
        </div>

        {/* The event's gallery, filtered to them */}
        <div className="p-4 md:p-6">
          <div className="flex gap-1.5 overflow-hidden">
            {folders.map((f, i) => (
              <Badge key={f} variant={i === 0 ? "default" : "outline"} className="shrink-0 font-normal">
                {f}
              </Badge>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-3">
            {sample.pool.slice(0, 8).map((photo, i) => (
              <PhotoTile
                key={photo}
                photo={photo}
                sizes="(min-width: 1024px) 210px, (min-width: 768px) 22vw, 30vw"
                className="animate-pop"
                delayMs={400 + i * 80}
              />
            ))}
          </div>
        </div>
      </BrowserFrame>
      </div>
      </div>

      {/* Layers beside the window (lg+): they rise faster than the page, so the hero has depth. */}
      <div className="sd-rise surface absolute -left-14 top-[19rem] z-10 hidden items-center gap-3 px-4 py-3 [--drift:4.5rem] lg:flex">
        <span className="flex -space-x-2">
          {[0, 3, 4].map((s) => (
            <ProfilePic key={s} seed={s} className="size-8 ring-2 ring-card" />
          ))}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold">Every guest, their own photos</span>
          <span className="block text-xs text-muted-foreground">Found with one selfie</span>
        </span>
      </div>
      <div className="sd-rise surface absolute -right-12 top-40 z-10 hidden items-center gap-3 p-2.5 pr-4 [--drift:7rem] lg:flex">
        <QrPattern className="size-12 rounded-md" />
        <span className="leading-tight">
          <span className="block text-sm font-semibold">Scan at the venue</span>
          <span className="block text-xs text-muted-foreground">No app, no login</span>
        </span>
      </div>
    </div>
  );
}

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[’']s\b/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
