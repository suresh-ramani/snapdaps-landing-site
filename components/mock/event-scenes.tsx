import { cn } from "@/lib/utils";
import { qrRows } from "./qr-rows";

/**
 * Hand-drawn SVG scenes (our own art) with theme tokens, so they work in light and dark mode —
 * for the "in short" sections that don't use a Lottie (QR code sharing;
 * the other use-case and feature pages use recoloured Lottie animations, see LottieScene).
 * Each shows where the QR code goes and how a guest ends up with their photos. Decorative: the
 * figure's caption carries the meaning, so the SVG is aria-hidden; text inside is sample UI.
 *
 * Motion lives in the shared parts, in one 6s CSS loop (`.scene-*` keyframes in globals.css,
 * transform/opacity only): a scan line sweeps each QR code. Reduced motion shows the static scene.
 */

type SceneProps = { className?: string };

function Svg({ className, children }: SceneProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 480 320"
      aria-hidden="true"
      className={cn("scene-anim h-auto w-full", className)}
      fontFamily="inherit"
      shapeRendering="geometricPrecision"
    >
      {children}
    </svg>
  );
}

/** A decorative QR code (the shared shadcn-derived pattern), drawn inside the scene. */
function Qr({ x, y, size }: { x: number; y: number; size: number }) {
  const c = size / 21;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={size} height={size} rx={2} fill="white" />
      {qrRows.map((row, ry) =>
        [...row].map((v, rx) =>
          v === "1" ? <rect key={`${rx}-${ry}`} x={rx * c} y={ry * c} width={c} height={c} fill="#18181b" /> : null,
        ),
      )}
      {/* Scan line sweeping the code (not on the tiny planner pins). */}
      {size >= 30 && (
        <rect
          x={-3}
          width={size + 6}
          height={2.5}
          rx={1.25}
          className="scene-qr-scan fill-brand-blue"
          style={{ "--scan": `${size}px` } as React.CSSProperties}
        />
      )}
    </g>
  );
}

/* ---------------------------------------------------------------------------------------------
   Feature scenes (/features/*): same rules as the event scenes above.
--------------------------------------------------------------------------------------------- */

/** QR code sharing: one event QR code, placed wherever guests are. */
export function QrPlacementScene({ className }: SceneProps) {
  const spots: [number, number, string][] = [
    [70, 70, "Welcome board"],
    [410, 70, "Invitation"],
    [60, 250, "Table card"],
    [420, 250, "Stage screen"],
    [240, 296, "WhatsApp group"],
  ];
  return (
    <Svg className={className}>
      {spots.map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M240 150 L${x} ${y}`} className="stroke-primary/40" strokeWidth="1.5" strokeDasharray="4 5" />
      ))}
      <rect x="180" y="86" width="120" height="132" rx="14" className="fill-card stroke-border" strokeWidth="1.5" />
      <Qr x={200} y={100} size={80} />
      <text x="240" y="200" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">
        One event QR code
      </text>
      {spots.map(([x, y, label]) => (
        <g key={label}>
          <rect x={x - 52} y={y - 15} width="104" height="30" rx="15" className="fill-card stroke-border" strokeWidth="1.5" />
          <circle cx={x - 36} cy={y} r="6" className="fill-primary/40" />
          <text x={x - 24} y={y + 4} className="fill-foreground" fontSize="10" fontWeight="500">
            {label}
          </text>
        </g>
      ))}
    </Svg>
  );
}

