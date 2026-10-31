"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";
import { cn } from "@/lib/utils";

/**
 * A Lottie animation (JSON in public/animations/, from LottieFiles under the Lottie Simple License —
 * source and author in public/animations/CREDITS.md). Played with lottie-web's light SVG player,
 * which is imported only when the scene comes near the screen, so it costs nothing on first load.
 *
 * - Space is reserved with `ratio`, so nothing shifts when it loads.
 * - Plays only while on screen; pauses when scrolled away.
 * - Reduced motion: stops on one meaningful frame (`stillAt`, a fraction of the animation) instead
 *   of looping.
 * - Decorative (aria-hidden): the caption or nearby text says what it shows.
 */
export function LottieScene({
  src,
  ratio = "1 / 1",
  stillAt = 0.6,
  className,
}: {
  src: string;
  ratio?: string;
  stillAt?: number;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let anim: AnimationItem | undefined;
    let loading = false;
    let visible = false;
    let cancelled = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (anim) {
          if (reduce) return;
          if (visible) anim.play();
          else anim.pause();
          return;
        }
        if (!visible || loading) return;
        loading = true;
        import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
          if (cancelled) return;
          anim = lottie.loadAnimation({
            container: el,
            renderer: "svg",
            loop: !reduce,
            autoplay: false,
            path: src,
            rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
          });
          anim.addEventListener("DOMLoaded", () => {
            if (!anim) return;
            if (reduce) anim.goToAndStop(Math.round(anim.totalFrames * stillAt), true);
            else if (visible) anim.play();
          });
        });
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      anim?.destroy();
    };
  }, [src, stillAt]);

  return <div ref={box} aria-hidden="true" className={cn("w-full", className)} style={{ aspectRatio: ratio }} />;
}
