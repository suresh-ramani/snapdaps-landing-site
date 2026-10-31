import { cn } from "@/lib/utils";
import { qrPath } from "./qr-rows";
import { TONES } from "./tones";

/**
 * Building blocks for coded product illustrations. Everything here is decorative
 * (aria-hidden) and stands in for real screenshots until you have them — swap any
 * mock for <Image src="/screens/..." /> without changing the surrounding layout.
 */

// PhotoTile lives in ./photo-tile (a client component, so it can read the page's photo pool).
export { PhotoTile } from "./photo-tile";

/** Abstract face: a person without a real likeness. */
export function Face({ seed = 0, className }: { seed?: number; className?: string }) {
  const skins = ["#e8b48f", "#c98e68", "#a8714f", "#f0c7a4", "#8d5b3f"];
  const hair = ["#2a1d17", "#3b2a22", "#1b1b1f", "#5a3a28", "#24201e"];
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("rounded-full", className)}>
      <rect width="64" height="64" fill={TONES[seed % TONES.length][0]} />
      <path d="M8 64c2-14 12-20 24-20s22 6 24 20z" fill={TONES[(seed + 3) % TONES.length][1]} />
      <circle cx="32" cy="28" r="13" fill={skins[seed % skins.length]} />
      <path d="M19 27c0-9 6-14 13-14s13 5 13 14c-3-5-8-7-13-7s-10 2-13 7z" fill={hair[seed % hair.length]} />
    </svg>
  );
}

export function PhoneFrame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true" data-nosnippet
      className={cn(
        "relative mx-auto w-[15.5rem] rounded-[2.2rem] border-[6px] border-[#15171e] bg-card p-0 shadow-[0_30px_60px_-24px_rgb(21_23_30/0.45)] dark:border-[#2a2e38]",
        className,
      )}
    >
      <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#15171e] dark:bg-[#2a2e38]" />
      <div className="overflow-hidden rounded-[1.7rem]">{children}</div>
    </div>
  );
}

export function BrowserFrame({
  url = "app.snapdaps.ai",
  className,
  children,
}: {
  url?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden="true" data-nosnippet
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-[0_24px_60px_-28px_rgb(21_23_30/0.35)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b bg-muted/50 px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff6159]" />
        <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="size-2.5 rounded-full bg-[#28c941]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-background px-3 py-1 text-[11px] text-muted-foreground">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

/** Small floating label used on mocks ("24 photos found"). */
export function MockChip({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium shadow-[0_10px_30px_-12px_rgb(21_23_30/0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}


export function QrPattern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 21 21" aria-hidden="true" className={cn("text-black", className)} shapeRendering="crispEdges">
      <rect width="21" height="21" fill="white" />
      <path d={qrPath} fill="currentColor" />
    </svg>
  );
}
