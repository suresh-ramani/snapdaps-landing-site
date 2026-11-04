"use client";

import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEventSample } from "@/components/mock/photo-pool";
import { BrowserFrame, Face, PhotoTile } from "@/components/mock/primitives";
import { cn } from "@/lib/utils";

/**
 * Home hero visual: one guest's view of the event page, in a single browser window — their selfie,
 * "38 photos found" and the photos they're in, under the event's folder filter. One window with one focal moment (the match), framed
 * the stageshow way (.claude/skills/stageshow): no plate behind it, wide enough to read, cropped by
 * a fade at the bottom so it runs out of the hero instead of floating with even margins.
 * Sample data only: decorative, inert, aria-hidden + data-nosnippet. Eight tiles = the eight photos
 * in the page's pool, so no photo repeats.
 */
export function HeroGallery({ className }: { className?: string }) {
  const sample = useEventSample();
  const folders = ["All", ...sample.folders];
  return (
    <div
      aria-hidden="true"
      data-nosnippet
      inert
      className={cn(
        // Padding leaves room for the window's shadow inside the mask; the mask fades the bottom out.
        "pointer-events-none mx-auto max-w-4xl select-none px-2 pt-2 [mask-image:linear-gradient(to_bottom,black_65%,transparent)] sm:px-6",
        className,
      )}
    >
      <BrowserFrame url={`snapdaps.ai/e/${slug(sample.name)}`} className="max-h-[28rem] md:max-h-[34rem]">
        {/* The guest: selfie, result, download */}
        <div className="flex items-center gap-4 border-b px-4 py-4 md:px-6">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-card [--scan-distance:3rem] md:size-14 md:[--scan-distance:3.5rem]">
            <Face seed={2} className="size-full rounded-none" />
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
  );
}

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[’']s\b/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
