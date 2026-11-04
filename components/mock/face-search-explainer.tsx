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
 * Framed large: the phone fills the frame's height and the photo grid runs off the right edge.
 * Use once per page: its clipPath ids are fixed.
 */

/** Tiles are drawn at 80 units and scaled up; the grid has a fourth column that runs off the right edge. */
const TILE = 80;
const SCALE = 1.15;
const STEP = TILE * SCALE + 12;
const COLS = 4;
const GRID_X = 236;
const GRID_Y = 26;
const WIDTH = 600;

type Person = { x: number; guest?: boolean; skin: string; top: string };
/** 4 × 3 event photos (the fourth column is cut off by the frame); the guest (violet top) is in four. */
const tiles: Person[][] = [
  [{ x: 40, guest: true, skin: "#c98f6b", top: "" }],
  [{ x: 26, skin: "#8d5a3b", top: "#64748b" }, { x: 56, skin: "#e0b48f", top: "#0ea5e9" }],
  [{ x: 40, skin: "#b07a55", top: "#f59e0b" }],
  [{ x: 30, skin: "#8d5a3b", top: "#10b981" }],
  [{ x: 28, skin: "#e0b48f", top: "#10b981" }, { x: 56, skin: "#8d5a3b", top: "#ef4444" }],
  [{ x: 26, guest: true, skin: "#c98f6b", top: "" }, { x: 56, skin: "#b07a55", top: "#64748b" }],
  [{ x: 40, guest: true, skin: "#c98f6b", top: "" }],
  [{ x: 30, skin: "#e0b48f", top: "#64748b" }],
  [{ x: 40, skin: "#8d5a3b", top: "#0ea5e9" }],
  [{ x: 28, skin: "#e0b48f", top: "#f59e0b" }, { x: 54, guest: true, skin: "#c98f6b", top: "" }],
  [{ x: 40, skin: "#b07a55", top: "#10b981" }],
  [{ x: 30, skin: "#b07a55", top: "#0ea5e9" }],
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
      viewBox={`0 0 ${WIDTH} 360`}
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
          <circle cx="98" cy="150" r="56" />
        </clipPath>
        <linearGradient id="fs-scan-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* The guest's phone with their selfie — drawn tall, nearly the full height of the frame */}
      <g>
        <rect x="10" y="8" width="176" height="344" rx="28" className="fill-card stroke-border" strokeWidth="2" />
        <rect x="76" y="20" width="44" height="7" rx="3.5" className="fill-muted" />
        <text x="98" y="68" textAnchor="middle" fontSize="13" fontWeight="600" className="fill-foreground">
          Take a selfie
        </text>
        <circle cx="98" cy="150" r="56" className="fill-muted" />
        <g clipPath="url(#fs-selfie)">
          <Figure p={{ x: 98, guest: true, skin: "#c98f6b", top: "" }} y={138} r={25} />
        </g>
        {/* Face frame corners */}
        <path
          d="M52 116v-12h12 M132 104h12v12 M144 184v12h-12 M64 196h-12v-12"
          fill="none"
          className="stroke-primary"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="98" cy="150" r="64" fill="none" className="fs-ring stroke-primary" strokeWidth="2.5" />
        <rect x="32" y="286" width="132" height="36" rx="18" className="fill-brand-blue" />
        <text x="98" y="309" textAnchor="middle" fontSize="13" fontWeight="600" fill="white">
          Find my photos
        </text>
      </g>

      {/* Selfie → photos */}
      <path d="M190 150H232" className="stroke-border" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />
      <circle cx="190" cy="150" r="4" className="fs-dot fill-primary" />
      <circle cx="190" cy="150" r="4" className="fs-dot fs-dot-2 fill-primary" />

      {/* Event photos */}
      {tiles.map((people, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = GRID_X + col * STEP;
        const y = GRID_Y + row * STEP;
        const match = people.some((p) => p.guest);
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${SCALE})`}>
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
        <rect x={GRID_X - 4} y={GRID_Y - 24} width={WIDTH - GRID_X + 4} height="24" fill="url(#fs-scan-grad)" />
        <rect x={GRID_X - 4} y={GRID_Y - 2} width={WIDTH - GRID_X + 4} height="2.5" rx="1.25" className="fill-primary" />
      </g>
    </svg>
  );
}
