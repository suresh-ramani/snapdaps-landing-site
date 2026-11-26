import Image from "next/image";
import { cn } from "@/lib/utils";
import { profileFor, type PersonName } from "./profiles";
import { qrPath } from "./qr-rows";

/**
 * Building blocks for coded product illustrations. Everything here is decorative
 * (aria-hidden) and stands in for real screenshots until you have them — swap any
 * mock for <Image src="/screens/..." /> without changing the surrounding layout.
 */

// PhotoTile lives in ./photo-tile (a client component, so it can read the page's photo pool).
export { PhotoTile } from "./photo-tile";


/**
 * Someone's everyday profile picture (`./profiles`): chat heads, avatar stacks, activity feeds and the
 * guest's selfie. `person` (a typed `PersonName`) picks the picture that fits that sample name; unnamed
 * avatars pass `seed` instead. Round by default; pass `rounded-none` inside a round frame. Decorative.
 */
export function ProfilePic({ person, seed = 0, className }: { person?: PersonName; seed?: number; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative inline-block shrink-0 overflow-hidden rounded-full bg-muted", className)}>
      <Image src={profileFor(person, seed)} alt="" fill sizes="64px" className="object-cover" />
    </span>
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
  decorative = true,
  children,
}: {
  url?: string;
  className?: string;
  /** Hide the whole window from screen readers (default). Pass false when it holds a real, described image. */
  decorative?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden={decorative || undefined} data-nosnippet
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-[0_24px_60px_-28px_rgb(21_23_30/0.35)]",
        className,
      )}
    >
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b bg-muted/50 px-3.5 py-2.5">
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
