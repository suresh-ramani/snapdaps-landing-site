"use client";

import { useEffect, useRef } from "react";
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
 * - Mobile/tablet: the swipe cards are pinned the same way; scrolling down glides to the next card,
 *   and swiping to a card moves the page to that card's spot, so swipe and scroll always agree.
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

      {/* Mobile / tablet: pinned swipe cards that also advance on scroll */}
      <PainCards points={points} />
    </>
  );
}

/**
 * Phone/tablet: a swipeable card strip pinned in its own scroll track (same engine as desktop).
 * - Vertical scroll sets the active card; the strip glides to it.
 * - A swipe is detected with an IntersectionObserver on the strip: it tracks how much of each card
 *   is in view, and once the strip has been still for 150ms the most visible card is selected —
 *   `select` scrolls the page to that card's slice. Cards the strip merely passes on the way are
 *   ignored, and so is the strip's own glide after a vertical scroll, so the two never fight.
 */
function PainCards({ points }: { points: PainPoint[] }) {
  const { active, canAnimate, select, sliceRef } = useScrollTabs(points.length);
  const stripRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef(active);
  const selectRef = useRef(select);
  const gliding = useRef(false);

  useEffect(() => {
    selectRef.current = select;
  });

  // Scroll → strip: glide to the active card.
  useEffect(() => {
    activeRef.current = active;
    const strip = stripRef.current;
    const card = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !card) return;
    const left = card.offsetLeft - parseFloat(getComputedStyle(strip).scrollPaddingLeft || "0");
    if (Math.abs(strip.scrollLeft - left) < 2) return;
    gliding.current = true;
    const t = window.setTimeout(() => (gliding.current = false), canAnimate ? 700 : 50);
    strip.scrollTo({ left, behavior: canAnimate ? "smooth" : "auto" });
    return () => window.clearTimeout(t);
  }, [active, canAnimate]);

  // Swipe → scroll: the card mostly in view becomes active.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const ratios = new Map<number, number>();
    let settle = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(Number((e.target as HTMLElement).dataset.card), e.intersectionRatio);
        window.clearTimeout(settle);
        settle = window.setTimeout(() => {
          if (gliding.current) return;
          let best = activeRef.current;
          ratios.forEach((r, i) => {
            if (r > (ratios.get(best) ?? 0) + 0.05) best = i;
          });
          if (best !== activeRef.current) selectRef.current(best);
        }, 150);
      },
      { root: strip, threshold: [0, 0.25, 0.5, 0.75, 0.9, 1] },
    );
    Array.from(strip.children).forEach((el) => io.observe(el));
    return () => {
      window.clearTimeout(settle);
      io.disconnect();
    };
  }, []);

  return (
    <ScrollTrack count={points.length} sliceRef={sliceRef} blockRem={35} display="lg:hidden">
      <ul
        ref={stripRef}
        // pt-2/-mt-2: horizontal scrolling forces overflow-y too, which would cut off the cards'
        // top border and shadow; the padding gives them room without moving anything.
        className="relative -mx-5 -mt-2 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 pt-2 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:px-8"
      >
        {points.map((p, i) => {
          const Icon = icons[p.kind];
          return (
            <li
              key={p.kind}
              data-card={i}
              className="surface flex w-[85%] shrink-0 snap-start flex-col overflow-hidden sm:w-[60%]"
            >
              <div aria-hidden="true" className="flex h-72 items-center justify-center overflow-hidden bg-before/40 p-5">
                <div className={cn("w-full max-w-xs origin-center", p.kind === "calls" ? "scale-[0.5]" : "scale-90")}>
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
        Scroll or swipe to see all {points.length}
      </p>
    </ScrollTrack>
  );
}
