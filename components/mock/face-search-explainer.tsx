import { cn } from "@/lib/utils";

/**
 * Animated explainer for AI face search (our own SVG, no third-party art), in three beats that
 * mirror the steps beside it on /how-it-works:
 *   1. a scan line passes over the event's photos and every face gets a box (found on upload);
 *   2. the guest's selfie on the phone pulses and sends its face across (the selfie is the search);
 *   3. the photos with the guest light up with a tick, the rest dim (matches in one gallery).
 *
 * One 9s CSS loop (`.fs-*` keyframes in globals.css) on transform/opacity only — no JS, no library.
 * Under reduced motion it shows the finished frame: matches ticked, the rest dimmed. Decorative:
 * the section's text says the same thing, so it's aria-hidden; colours are theme tokens (the
 * guest's violet top and skin tones are illustration colours, allowed in components/mock/*).
 * Use once per page: its clipPath ids are fixed.
 */

const TILE = 80;
const GAP = 10;
const GRID_X = 196;
const GRID_Y = 44;

type Person = { x: number; guest?: boolean; skin: string; top: string };
/** 3 × 3 event photos; the guest (violet top) is in four of them. */
const tiles: Person[][] = [
  [{ x: 40, guest: true, skin: "#c98f6b", top: "" }],
  [{ x: 26, skin: "#8d5a3b", top: "#64748b" }, { x: 56, skin: "#e0b48f", top: "#0ea5e9" }],
  [{ x: 40, skin: "#b07a55", top: "#f59e0b" }],
  [{ x: 28, skin: "#e0b48f", top: "#10b981" }, { x: 56, skin: "#8d5a3b", top: "#ef4444" }],
  [{ x: 26, guest: true, skin: "#c98f6b", top: "" }, { x: 56, skin: "#b07a55", top: "#64748b" }],
  [{ x: 40, guest: true, skin: "#c98f6b", top: "" }],
  [{ x: 40, skin: "#8d5a3b", top: "#0ea5e9" }],
  [{ x: 28, skin: "#e0b48f", top: "#f59e0b" }, { x: 54, guest: true, skin: "#c98f6b", top: "" }],
  [{ x: 40, skin: "#b07a55", top: "#10b981" }],
];
const GUEST_TOP = "#aa5cf6";
const GUEST_HAIR = "#2b2118";

function Figure({ p, y = 34, r = 11 }: { p: Person; y?: number; r?: number }) {
  return (
    <g>
      <ellipse cx={p.x} cy={y + r * 2.6} rx={r * 1.7} ry={r * 1.3} fill={p.guest ? GUEST_TOP : p.top} />
      <circle cx={p.x} cy={y} r={r} fill={p.skin} />
      {p.guest && <path d={`M${p.x - r} ${y - 1} a${r} ${r} 0 0 1 ${r * 2} 0 q-${r} -${r * 0.55} -${r * 2} 0z`} fill={GUEST_HAIR} />}
    </g>
  );
}

export function FaceSearchExplainer({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 360"
      aria-hidden="true"
      className={cn("fs-scene h-auto w-full", className)}
      fontFamily="inherit"
      shapeRendering="geometricPrecision"
    >
      <defs>
        {tiles.map((_, i) => (
          <clipPath key={i} id={`fs-tile-${i}`}>
            <rect width={TILE} height={TILE} rx={10} />
          </clipPath>
        ))}
        <clipPath id="fs-selfie">
          <circle cx="78" cy="168" r="44" />
        </clipPath>
        <linearGradient id="fs-scan-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* The guest's phone with their selfie */}
      <g>
        <rect x="14" y="70" width="128" height="230" rx="20" className="fill-card stroke-border" strokeWidth="2" />
        <rect x="58" y="80" width="40" height="6" rx="3" className="fill-muted" />
        <circle cx="78" cy="168" r="44" className="fill-muted" />
        <g clipPath="url(#fs-selfie)">
          <Figure p={{ x: 78, guest: true, skin: "#c98f6b", top: "" }} y={158} r={20} />
        </g>
        {/* Face frame corners */}
        <path
          d="M50 138v-10h10 M96 128h10v10 M106 198v10h-10 M60 208h-10v-10"
          fill="none"
          className="stroke-primary"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="78" cy="168" r="50" fill="none" className="fs-ring stroke-primary" strokeWidth="2.5" />
        <rect x="30" y="238" width="96" height="26" rx="13" className="fill-brand-blue" />
        <text x="78" y="255" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">
          Find my photos
        </text>
      </g>

      {/* Selfie → photos */}
      <path d="M146 168H188" className="stroke-border" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />
      <circle cx="146" cy="168" r="4" className="fs-dot fill-primary" />
      <circle cx="146" cy="168" r="4" className="fs-dot fs-dot-2 fill-primary" />

      {/* Event photos */}
      {tiles.map((people, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = GRID_X + col * (TILE + GAP);
        const y = GRID_Y + row * (TILE + GAP);
        const match = people.some((p) => p.guest);
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g clipPath={`url(#fs-tile-${i})`}>
              <rect width={TILE} height={TILE} className="fill-muted" />
              <rect y={TILE * 0.62} width={TILE} height={TILE * 0.38} className="fill-border" opacity="0.6" />
              {people.map((p, j) => (
                <Figure key={j} p={p} />
              ))}
            </g>
            {/* Face boxes, found as the scan passes this row */}
            {people.map((p, j) => (
              <rect
                key={j}
                x={p.x - 15}
                y={19}
                width={30}
                height={30}
                rx={4}
                fill="none"
                className={cn("fs-box stroke-primary", `fs-row-${row}`)}
                strokeWidth="2"
              />
            ))}
            {match ? (
              <>
                <rect width={TILE} height={TILE} rx={10} fill="none" className="fs-match stroke-[var(--after-ink)]" strokeWidth="3" />
                <g className="fs-check">
                  <circle cx={TILE - 13} cy={13} r={10} className="fill-[var(--after-ink)]" />
                  <path d={`M${TILE - 18} 13l3.5 3.5 6.5-7`} fill="none" className="stroke-card" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </>
            ) : (
              <rect width={TILE} height={TILE} rx={10} className="fs-dim fill-card" />
            )}
          </g>
        );
      })}

      {/* Scan line sweeping the photos */}
      <g className="fs-scan">
        <rect x={GRID_X - 4} y={GRID_Y - 24} width={TILE * 3 + GAP * 2 + 8} height="24" fill="url(#fs-scan-grad)" />
        <rect x={GRID_X - 4} y={GRID_Y - 2} width={TILE * 3 + GAP * 2 + 8} height="2.5" rx="1.25" className="fill-primary" />
      </g>
    </svg>
  );
}
