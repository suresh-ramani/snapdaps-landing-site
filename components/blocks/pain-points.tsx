"use client";

import { Frown, HardDrive, PhoneCall, Search, Usb } from "lucide-react";
import { PainIllustration } from "@/components/mock/pain-illustrations";
import { cn } from "@/lib/utils";
import { ScrollTrack, useScrollTabs } from "./scroll-tabs";

export type PainPoint = {
  kind: "search" | "calls" | "pendrive" | "drive" | "referrals";
  title: string;
  body: string;
};

const icons = { search: Search, calls: PhoneCall, pendrive: Usb, drive: HardDrive, referrals: Frown };

/**
 * Pain points as scroll-linked tabs + one large visual (layout after Tailark's selectable
 * features block, MIT, github.com/tailark/blocks). Scroll behaviour comes from `scroll-tabs.tsx`.
 *
 * - Desktop: pinned tabs + illustration; scrolling or clicking a tab swaps the illustration.
 *   Every title and body is always visible (inactive tabs are muted, never collapsed), so fast
 *   scrolling only skips pictures. Each title is a button inside its h3.
 * - Mobile/tablet: swipeable cards (CSS scroll-snap), each with its own visual.
 * - Visual swaps use opacity/transform only.
 */
export function PainPoints({ points, defaultIndex = 0 }: { points: PainPoint[]; defaultIndex?: number }) {
  const { active, tabProps, sliceRef } = useScrollTabs(points.length, defaultIndex);

  return (
    <>
      {/* Desktop: pinned tabs + visual */}
      <ScrollTrack
        count={points.length}
        sliceRef={sliceRef}
        className="grid items-stretch gap-10 lg:grid-cols-[1fr_1.15fr] xl:gap-16"
      >
        <ol className="flex flex-col gap-1.5">
          {points.map((p, i) => {
            const Icon = icons[p.kind];
            const isActive = i === active;
            return (
              <li
                key={p.kind}
                className={cn(
                  "relative rounded-xl px-4 py-3.5 motion-safe:transition-colors",
                  isActive ? "surface" : "hover:bg-card/60",
                )}
              >
                <div className="flex gap-3.5">
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl motion-safe:transition-colors",
                      isActive ? "bg-before text-before-ink" : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight">
                      <button
                        {...tabProps(i, "pain-visual")}
                        className={cn(
                          "rounded-md text-left outline-offset-4 after:absolute after:inset-0 after:rounded-xl after:content-['']",
                          !isActive && "text-muted-foreground",
                        )}
                      >
                        {p.title}
                      </button>
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div
          id="pain-visual"
          aria-hidden="true"
          className="relative min-h-[28rem] overflow-hidden rounded-3xl border bg-before/40 p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,var(--before),transparent_70%)]" />
          {points.map((p, i) => (
            <div
              key={p.kind}
              className={cn(
                "absolute inset-8 flex items-center justify-center motion-safe:transition-[opacity,transform] motion-safe:duration-500",
                i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
              )}
            >
              <div className="w-full max-w-md">
                <PainIllustration kind={p.kind} />
              </div>
            </div>
          ))}
          {/* Position, e.g. 2 / 5 */}
          <span className="absolute bottom-5 right-6 text-sm font-medium tabular-nums text-muted-foreground">
            {active + 1} / {points.length}
          </span>
        </div>
      </ScrollTrack>

      {/* Mobile / tablet: swipeable cards */}
      <div className="lg:hidden">
        <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:px-8">
          {points.map((p, i) => {
            const Icon = icons[p.kind];
            return (
              <li key={p.kind} className="surface flex w-[85%] shrink-0 snap-start flex-col overflow-hidden sm:w-[60%]">
                <div aria-hidden="true" className="flex h-72 items-center justify-center overflow-hidden bg-before/40 p-5">
                  <div className={cn("w-full max-w-xs origin-center", p.kind === "calls" ? "scale-[0.58]" : "scale-90")}>
                    <PainIllustration kind={p.kind} />
                  </div>
                </div>
                <div className="p-5">
                  <span className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-before text-before-ink">
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {i + 1} of {points.length}
                    </span>
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-muted-foreground">{p.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-1 text-center text-xs text-muted-foreground" aria-hidden="true">
          Swipe to see all {points.length}
        </p>
      </div>
    </>
  );
}
