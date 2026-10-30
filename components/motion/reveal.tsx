"use client";

import { LazyMotion, MotionConfig, domAnimation, m, type Variants } from "motion/react";

/**
 * Scroll-triggered entrances, built on Motion (motion.dev, MIT).
 *
 * - `MotionProvider` (root layout) loads only the `domAnimation` feature set through LazyMotion,
 *   so pages ship the small `m` components instead of the full `motion` bundle. `strict` makes
 *   any accidental `motion.*` import throw. `reducedMotion="user"` drops transforms for people
 *   who ask for less motion (opacity still eases).
 * - `RevealGroup` starts its children when it scrolls into view (`whileInView`, once) and
 *   staggers them; `Reveal` is one child, picking a named preset so server components can use it
 *   (props stay serialisable).
 * - Content is never invisible: every preset starts at 0.35 opacity, so the server HTML shows
 *   real text before JavaScript runs. Presets animate transform + opacity only.
 */

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

const START = 0.35;
const EASE = [0.22, 1, 0.36, 1] as const;

const presets = {
  /** Cards and tiles: rise a little. */
  rise: { hidden: { opacity: START, y: 24 }, shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } },
  /** Grids with hairline borders, where moving cells would open gaps. */
  fade: { hidden: { opacity: START }, shown: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } },
  /** "Old way" side of a pair. */
  left: { hidden: { opacity: START, x: -20 }, shown: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } },
  /** "With Snapdaps" side of a pair. */
  right: { hidden: { opacity: START, x: 20 }, shown: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } },
  /** Chat bubbles arriving. Set transform-origin on the element (origin-top-left/right). */
  pop: {
    hidden: { opacity: START, scale: 0.85, y: 8 },
    shown: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 420, damping: 28 } },
  },
  /** A nested group (e.g. a row whose two halves arrive one after the other). */
  sequence: { hidden: {}, shown: { transition: { staggerChildren: 0.18 } } },
} satisfies Record<string, Variants>;

export type RevealPreset = keyof typeof presets;
type Tag = "div" | "ul" | "ol" | "li" | "p" | "span";

const tags = { div: m.div, ul: m.ul, ol: m.ol, li: m.li, p: m.p, span: m.span };

type CommonProps = {
  as?: Tag;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/** Starts its `Reveal` children when it scrolls into view, one after another. */
export function RevealGroup({
  as = "div",
  stagger = 0.08,
  amount = 0.2,
  className,
  style,
  children,
}: CommonProps & {
  /** Seconds between children. */
  stagger?: number;
  /** Share of the group that must be visible before it starts (0–1). */
  amount?: number;
}) {
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  );
}

/** One animated child of a `RevealGroup` (or of a `Reveal` with `preset="sequence"`). */
export function Reveal({ as = "div", preset = "rise", className, style, children }: CommonProps & { preset?: RevealPreset }) {
  const Tag = tags[as];
  return (
    <Tag className={className} style={style} variants={presets[preset]}>
      {children}
    </Tag>
  );
}
