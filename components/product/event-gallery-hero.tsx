"use client";

import Image from "next/image";
import { Check, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEventSample } from "@/components/mock/photo-pool";
import { photos, type PhotoName } from "@/components/mock/photos";
import { BrowserFrame, Face, PhotoTile } from "@/components/mock/primitives";
import { cn } from "@/lib/utils";

/**
 * Use-case hero visual: one guest's gallery for that page's event, in a browser window — their
 * selfie, "N photos of you", the event's folders, and their photos with the page's own photo as
 * the large first tile. Same idea as the home `HeroGallery`, sized for the split hero's right
 * column. Event name, folders and the small tiles come from the page's `<PhotoPool>`
 * (`eventSamples[PATH]`), so every use-case page shows its own event.
 *
 * The featured photo is real content: `next/image` with the page's own `alt` and `priority`
 * (it's the LCP image), so the window isn't aria-hidden — only its sample UI is (aria-hidden +
 * data-nosnippet). Framed the stageshow way: one window, one focal moment (the match), cropped by a
 * fade at the bottom. Lies back slightly and flattens as the page scrolls (`sd-tilt`).
 */
export function EventGalleryHero({
  photo,
  alt,
  found,
  folder = 0,
  selfie = 2,
  className,
}: {
  /** The page's own hero photo (unique per page), shown as the large first tile. */
  photo: PhotoName;
  /** Real description of that photo. */
  alt: string;
  /** Sample count for "N photos of you". */
  found: number;
  /** Which of the event's four folders is selected (0 = "All"). */
  folder?: 0 | 1 | 2 | 3 | 4;
  /** Seed for the guest's illustrated selfie. */
  selfie?: number;
  className?: string;
}) {
  const sample = useEventSample();
  const folders = ["All", ...sample.folders];
  const tiles = sample.pool.filter((p) => p !== photo).slice(0, 5);
  return (
    <div className={cn("relative mx-auto w-full max-w-xl", className)}>
      {/* Padding keeps the window's shadow inside the mask; the mask fades the bottom out. */}
      <div className="px-1 pt-1 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
        <div className="sd-tilt">
          <BrowserFrame decorative={false} url={`snapdaps.ai/e/${slug(sample.name)}`} className="max-h-[32rem]">
            <div aria-hidden="true" className="flex items-center gap-3 border-b px-4 py-3.5">
              <div className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-card [--scan-distance:2.75rem]">
                <Face seed={selfie} className="size-full rounded-none" />
                <span className="animate-scan absolute inset-x-0 top-0 h-0.5 bg-primary shadow-[0_0_10px_2px_var(--primary)]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-muted-foreground">{sample.name}</p>
                <p className="text-base font-semibold tracking-tight">{found} photos of you</p>
              </div>
              <span className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground">
                <Download className="size-4" />
                <span className="max-sm:sr-only">Download</span>
              </span>
            </div>

            <div className="p-3 sm:p-4">
              <div aria-hidden="true" className="flex gap-1.5 overflow-hidden">
                {folders.map((f, i) => (
                  <Badge key={f} variant={i === folder ? "default" : "outline"} className="shrink-0 font-normal">
                    {f}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-md">
                  <Image
                    src={photos[photo]}
                    alt={alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 22rem, 62vw"
                    className="object-cover"
                  />
                  <Tick />
                </div>
                {tiles.map((p, i) => (
                  <div key={p} aria-hidden="true" className="relative">
                    <PhotoTile photo={p} sizes="(min-width: 1024px) 11rem, 30vw" />
                    {i % 2 === 0 && <Tick />}
                  </div>
                ))}
              </div>
            </div>
          </BrowserFrame>
        </div>
      </div>
    </div>
  );
}

function Tick() {
  return (
    <span aria-hidden="true" className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
      <Check className="size-3" />
    </span>
  );
}

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[’']s\b/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
