"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mounts decorative children only when they come near the screen, then keeps them.
 *
 * For heavy illustrations (product cards, pain-point pictures) that don't need to be in the
 * server HTML: until then it renders an empty placeholder with the same `className`, so the space
 * is reserved and nothing shifts. Layouts hidden at the current breakpoint (`display: none`) never
 * intersect, so their illustrations are never built at all. Never wrap text or headings in this —
 * content must stay in the server HTML.
 */
export function LazyMount({
  className,
  rootMargin = "300px 100% 300px 100%",
  children,
}: {
  /** Applied to both the placeholder and the mounted wrapper, so the box keeps its size. */
  className?: string;
  /** How far outside the viewport to start mounting (vertical and horizontal, for swipe strips). */
  rootMargin?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || mounted) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {mounted ? children : null}
    </div>
  );
}
