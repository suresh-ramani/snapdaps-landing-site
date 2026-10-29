import { cn } from "@/lib/utils";

/**
 * Flag of India as inline SVG (emoji flags don't render on Windows — they show "IN").
 * Official colours: saffron #FF9933, white, India green #138808, navy Ashoka Chakra with 24 spokes.
 */
export function IndiaFlag({ className, label }: { className?: string; /** Accessible name when the flag stands in for a word. */ label?: string }) {
  const spokes = Array.from({ length: 24 }, (_, i) => (i * Math.PI) / 12);
  return (
    <svg
      viewBox="0 0 30 20"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={cn("h-3.5 w-auto rounded-[2px] ring-1 ring-black/10", className)}
    >
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.667" fill="#FF9933" />
      <rect y="13.333" width="30" height="6.667" fill="#138808" />
      <g stroke="#000080" fill="none">
        <circle cx="15" cy="10" r="2.85" strokeWidth="0.4" />
        {spokes.map((a, i) => (
          <line
            key={i}
            x1="15"
            y1="10"
            x2={(15 + 2.85 * Math.cos(a)).toFixed(3)}
            y2={(10 + 2.85 * Math.sin(a)).toFixed(3)}
            strokeWidth="0.18"
          />
        ))}
      </g>
      <circle cx="15" cy="10" r="0.55" fill="#000080" />
    </svg>
  );
}
