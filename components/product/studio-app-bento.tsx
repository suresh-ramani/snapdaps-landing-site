import { Bell, Check, Smartphone } from "lucide-react";
import { AppleLogo, GooglePlayLogo } from "@/components/mock/brand-icons";
import { PhotoTile, ProfilePic } from "@/components/mock/primitives";
import { cn } from "@/lib/utils";

/**
 * "Your studio app, in short" scene: a small bento of what the studio's own app is, one idea per tile —
 * their icon on a client's home screen (the hero tile), their name/logo/colours, the photo-ready alert,
 * selfie search, and both app stores. Same language as `FeatureBento` (surface tiles, each picture cut
 * by its tile edge, one focal moment each). "Your Studio" / "YS" and violet stand in for the studio's
 * brand. Sample UI: aria-hidden + data-nosnippet; the summary beside it says the same in words.
 */
export function StudioAppBento({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-nosnippet
      className={cn("mx-auto grid w-full max-w-md grid-cols-2 gap-3 text-left", className)}
    >
      {/* Hero: their app on a client's home screen */}
      <Tile className="row-span-2 flex flex-col">
        <Label>On your clients’ phones</Label>
        <div className="relative mt-3 flex-1 overflow-hidden rounded-t-2xl border-x-4 border-t-4 border-foreground/85 bg-gradient-to-b from-primary/15 to-brand-violet/30 px-3 pt-5">
          <div className="grid grid-cols-3 gap-x-1.5 gap-y-3 sm:gap-x-2">
            {Array.from({ length: 9 }).map((_, i) =>
              i === 4 ? (
                <span key={i} className="flex flex-col items-center gap-1">
                  <span className="animate-pop flex size-8 items-center justify-center rounded-lg bg-brand-violet text-[10px] font-bold text-white shadow-md ring-2 ring-white sm:size-10 sm:rounded-xl sm:text-[11px]">
                    YS
                  </span>
                  <span className="whitespace-nowrap text-[9px] font-semibold text-foreground">Your Studio</span>
                </span>
              ) : (
                <span key={i} className="flex flex-col items-center gap-1">
                  <span className="size-8 rounded-lg bg-white/55 sm:size-10 sm:rounded-xl dark:bg-white/15" />
                  <span className="h-1.5 w-6 rounded-full bg-white/50 sm:w-7 dark:bg-white/15" />
                </span>
              ),
            )}
          </div>
        </div>
      </Tile>

      {/* Their brand */}
      <Tile>
        <Label>Your name, logo, colours</Label>
        <div className="mt-3 flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-brand-violet text-[10px] font-bold text-white">
            YS
          </span>
          <span className="text-sm font-semibold">Your Studio</span>
        </div>
        <div className="mt-2.5 flex gap-1.5">
          {["bg-brand-violet", "bg-brand-indigo", "bg-primary", "bg-foreground/80"].map((c) => (
            <span key={c} className={cn("size-5 rounded-full ring-2 ring-card", c)} />
          ))}
        </div>
      </Tile>

      {/* Photo-ready alert */}
      <Tile>
        <Label>Photo-ready alert</Label>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-muted/60 p-2 ring-1 ring-border">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-violet text-[9px] font-bold text-white">
            YS
          </span>
          <span className="min-w-0 leading-tight">
            <span className="flex items-center gap-1 text-[11px] font-semibold">
              <Bell className="size-3" /> Your Studio
            </span>
            <span className="block text-[11px] text-muted-foreground">Your photos are ready</span>
          </span>
        </div>
      </Tile>

      {/* Selfie search, cut by the tile's bottom edge */}
      <Tile className="col-span-2 flex items-center gap-4 overflow-hidden pb-0">
        <div className="flex shrink-0 flex-col items-center gap-1.5 pb-4">
          <ProfilePic person="Meera" className="size-12 ring-2 ring-primary ring-offset-2 ring-offset-card" />
          <span className="text-[11px] font-semibold">24 photos of you</span>
        </div>
        <div className="grid flex-1 translate-y-3 grid-cols-4 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <PhotoTile seed={i} sizes="80px" />
              {i < 3 && (
                <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
              )}
            </div>
          ))}
        </div>
      </Tile>

      {/* Both stores */}
      <Tile className="col-span-2 flex flex-wrap items-center justify-between gap-2 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Smartphone className="size-4 text-primary" /> Android phones and iPhones
        </span>
        {/* Store badges: each store's own mark, small, next to its name (brand-icons.tsx). */}
        <span className="flex gap-1.5">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-background">
            <GooglePlayLogo className="size-4" />
            <span className="leading-none">
              <span className="block text-[8px] opacity-80">Get it on</span>
              <span className="block text-[11px] font-semibold">Google Play</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-background">
            <AppleLogo className="size-4" />
            <span className="leading-none">
              <span className="block text-[8px] opacity-80">Download on the</span>
              <span className="block text-[11px] font-semibold">App Store</span>
            </span>
          </span>
        </span>
      </Tile>
    </div>
  );
}

function Tile({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("surface p-3.5", className)}>{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold text-muted-foreground">{children}</p>;
}
