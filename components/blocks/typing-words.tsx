"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/**
 * Typewriter word swap for headlines. The typing state machine (type → pause → delete →
 * next word) follows Magic UI's TypingAnimation (MIT, github.com/magicuidesign/magicui),
 * rewritten without `motion` and with one SEO-critical difference: the first word is
 * rendered complete on the server and on first paint, so the HTML Google indexes (and what
 * users see before hydration) is the full headline. Typing starts only after a pause.
 *
 * - The emoji is drawn by CSS (`::after { content: attr(data-emoji) }`), so it isn't part of
 *   the heading's text content and isn't indexed.
 * - Give the parent heading an `aria-label` with the fixed headline: screen readers then
 *   never hear half-typed words.
 * - Stops while off-screen; static (first word) under prefers-reduced-motion.
 */

export type TypingWord = { text: string; emoji?: string };

type Phase = "hold" | "delete" | "type";
type State = { i: number; n: number; phase: Phase; first: boolean };

const TYPE_MS = 75;
const DELETE_MS = 38;
const HOLD_MS = 2200;
const FIRST_HOLD_MS = 2600;
const GAP_MS = 280;

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const motionAllowed = () => !window.matchMedia(motionQuery).matches;
const motionAllowedOnServer = () => false;

const length = (s: string) => Array.from(s).length;

export function TypingWords({ words, className }: { words: TypingWord[]; className?: string }) {
  const [s, setS] = useState<State>(() => ({ i: 0, n: length(words[0]?.text ?? ""), phase: "hold", first: true }));
  const canAnimate = useSyncExternalStore(subscribeMotion, motionAllowed, motionAllowedOnServer);
  const [onScreen, setOnScreen] = useState(true);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = canAnimate && onScreen && words.length > 1;

  useEffect(() => {
    if (!running) return;
    let delay: number;
    let next: State;
    if (s.phase === "hold") {
      delay = s.first ? FIRST_HOLD_MS : HOLD_MS;
      next = { ...s, phase: "delete", first: false };
    } else if (s.phase === "delete") {
      if (s.n > 0) {
        delay = DELETE_MS;
        next = { ...s, n: s.n - 1 };
      } else {
        delay = GAP_MS;
        next = { ...s, i: (s.i + 1) % words.length, phase: "type" };
      }
    } else if (s.n < length(words[s.i].text)) {
      delay = TYPE_MS;
      next = { ...s, n: s.n + 1 };
    } else {
      delay = 0;
      next = { ...s, phase: "hold" };
    }
    const t = window.setTimeout(() => setS(next), delay);
    return () => window.clearTimeout(t);
  }, [running, s, words]);

  if (!words.length) return null;
  const word = canAnimate ? words[s.i] : words[0];
  const shown = canAnimate ? Array.from(word.text).slice(0, s.n).join("") : word.text;
  const complete = !canAnimate || s.phase === "hold";

  return (
    <span ref={ref} className={cn("typing-word", className)} data-emoji={complete ? word.emoji : undefined}>
      <span className="text-brand-gradient">{shown}</span>
      {canAnimate && !complete && <span aria-hidden="true" className="typing-caret" />}
    </span>
  );
}
