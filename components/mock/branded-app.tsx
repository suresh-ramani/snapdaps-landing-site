import { Bell, Download, Heart, ScanFace } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhoneFrame, PhotoTile } from "./primitives";

/**
 * A studio's white-label app (sample): the studio's own name, logo and colour on the app header,
 * tabs for that studio's own events and portfolio (no other studio ever appears),
 * a "photos are ready" notification, selfie search, a gallery with favourites and downloads, and
 * the app icon as it sits on a home screen. "Your Studio" stands in for the studio's brand;
 * violet stands in for the studio's colour. Decorative sample UI (PhoneFrame is aria-hidden +
 * data-nosnippet); swap in real screenshots when the team provides them.
 */
export function BrandedApp({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-sm", className)}>
      {/* Notification */}
      <div
        aria-hidden="true"
        data-nosnippet
        className="surface absolute -top-4 left-0 right-6 z-20 flex items-center gap-3 px-3.5 py-2.5 sm:-left-6"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-violet text-xs font-bold text-white">
          YS
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 text-xs font-semibold">
            <Bell className="size-3" /> Your Studio
          </span>
          <span className="block truncate text-xs text-muted-foreground">Your wedding photos are ready ✨</span>
        </span>
      </div>

      <PhoneFrame className="mt-8">
        {/* Branded header */}
        <div className="bg-brand-violet px-4 pb-4 pt-8 text-white">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">YS</span>
            <span className="text-sm font-semibold">Your Studio</span>
          </div>
          <div className="mt-3 flex gap-1.5 text-[11px] font-medium">
            <span className="rounded-full bg-white px-2.5 py-1 text-[#8B3FE0]">Events</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1">Portfolio</span>
          </div>
        </div>
        <p className="px-3 pt-3 text-xs font-semibold">Riya &amp; Arjun’s wedding</p>
        <div className="space-y-3 p-3 pt-2">
          <div className="flex items-center justify-center gap-2 rounded-lg bg-brand-violet/10 py-2 text-xs font-medium text-purple">
            <ScanFace className="size-4" /> Find my photos with a selfie
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative">
                <PhotoTile seed={i} sizes="80px" className="aspect-square" />
                {i % 3 === 0 && (
                  <Heart className="absolute right-1 top-1 size-3.5 fill-white text-white drop-shadow" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-lg border px-3 py-2 text-xs">
            <span className="font-medium">2 favourites selected</span>
            <Download className="size-3.5 text-muted-foreground" />
          </div>
        </div>
      </PhoneFrame>

      {/* App icon on a home screen */}
      <div
        aria-hidden="true"
        data-nosnippet
        className="surface absolute -bottom-4 right-0 z-20 flex items-center gap-3 p-2.5 pr-4 sm:-right-6"
      >
        <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-violet text-sm font-bold text-white shadow">
          YS
        </span>
        <span className="text-xs leading-tight">
          <span className="block font-semibold">Your Studio</span>
          <span className="text-muted-foreground">Android &amp; iOS</span>
        </span>
      </div>
    </div>
  );
}
