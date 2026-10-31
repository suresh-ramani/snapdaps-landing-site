import { cn } from "@/lib/utils";
import { qrRows } from "./qr-rows";

/**
 * One flat vector scene per use case, drawn here (our own SVG, no third-party art) with theme
 * tokens, so every scene works in light and dark mode. Each shows where Snapdaps fits at that
 * event: where the QR code goes and how a guest ends up with their photos. Decorative: the
 * figure's caption carries the meaning, so the SVG is aria-hidden; text inside is sample UI.
 *
 * Marigold/amber accents are illustration colours (allowed in components/mock/*).
 */

type SceneProps = { className?: string };

function Svg({ className, children }: SceneProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 480 320"
      aria-hidden="true"
      className={cn("h-auto w-full", className)}
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
    </g>
  );
}

/** A phone showing the guest's matched photos after a selfie. */
function Phone({ x, y, scale = 1, label = "Your photos" }: { x: number; y: number; scale?: number; label?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect width="64" height="116" rx="12" className="fill-card stroke-border" strokeWidth="1.5" />
      <rect x="22" y="6" width="20" height="4" rx="2" className="fill-muted" />
      <circle cx="16" cy="24" r="7" className="fill-primary/20 stroke-primary" strokeWidth="1.5" />
      <text x="27" y="27" className="fill-foreground" fontSize="7" fontWeight="600">
        {label}
      </text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={8 + (i % 2) * 25}
          y={38 + Math.floor(i / 2) * 24}
          width="23"
          height="22"
          rx="3"
          className={i === 0 ? "fill-primary/35" : i % 3 === 1 ? "fill-brand-violet/25" : "fill-muted"}
        />
      ))}
    </g>
  );
}

function Person({
  x,
  y,
  tone = "muted",
  scale = 1,
}: {
  x: number;
  y: number;
  tone?: "muted" | "primary" | "violet";
  scale?: number;
}) {
  const fill =
    tone === "primary" ? "fill-primary/70" : tone === "violet" ? "fill-brand-violet/70" : "fill-muted-foreground/30";
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="0" r="9" className={fill} />
      <rect x="-12" y="12" width="24" height="34" rx="11" className={fill} />
    </g>
  );
}

function Label({
  x,
  y,
  children,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="fill-muted-foreground" fontSize="11" fontWeight="500">
      {children}
    </text>
  );
}

function Arrow({ d }: { d: string }) {
  return (
    <path
      d={d}
      className="stroke-primary"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      fill="none"
      markerEnd="url(#scene-arrow)"
    />
  );
}

function ArrowDef() {
  return (
    <defs>
      <marker id="scene-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L8 4 L0 8 z" className="fill-primary" />
      </marker>
    </defs>
  );
}

/** Wedding: mandap with marigold garlands, a welcome board with the QR code, a guest's phone. */
export function WeddingScene({ className }: SceneProps) {
  return (
    <Svg className={className}>
      <ArrowDef />
      <rect x="0" y="262" width="480" height="58" className="fill-muted/60" />
      {/* Mandap */}
      <rect x="168" y="96" width="12" height="166" rx="3" className="fill-muted-foreground/25" />
      <rect x="300" y="96" width="12" height="166" rx="3" className="fill-muted-foreground/25" />
      <path d="M156 100 Q240 30 324 100 Z" className="fill-brand-violet/15 stroke-brand-violet/50" strokeWidth="2" />
      <path
        d="M174 104 Q240 150 306 104"
        fill="none"
        className="stroke-amber-400"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={174 + i * 33} cy={106 + (i % 2) * 6} r="5" className="fill-amber-400" />
      ))}
      <Person x={222} y={196} tone="primary" />
      <Person x={258} y={196} tone="violet" />
      {/* Welcome board on an easel */}
      <path d="M70 262 L92 150 M130 262 L108 150" className="stroke-muted-foreground/40" strokeWidth="3" />
      <rect x="52" y="120" width="96" height="110" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="100" y="140" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
        Welcome
      </text>
      <Qr x={72} y={150} size={56} />
      <text x="100" y="221" textAnchor="middle" className="fill-muted-foreground" fontSize="8">
        Scan for your photos
      </text>
      {/* Guest phone */}
      <Arrow d="M150 176 C200 250 330 250 368 196" />
      <Phone x={372} y={136} />
      <Label x={100} y={292} anchor="middle">
        QR on the welcome board
      </Label>
      <Label x={404} y={292} anchor="middle">
        Selfie → their photos
      </Label>
    </Svg>
  );
}

/** Birthday: cake table with balloons, a QR standee beside the cake, a parent's phone. */
export function BirthdayScene({ className }: SceneProps) {
  return (
    <Svg className={className}>
      <ArrowDef />
      {/* Balloons */}
      {[
        [96, 70, "fill-primary/60"],
        [132, 52, "fill-brand-violet/60"],
        [166, 78, "fill-amber-400/80"],
        [330, 60, "fill-brand-violet/50"],
        [362, 84, "fill-primary/50"],
      ].map(([cx, cy, cls]) => (
        <g key={`${cx}`}>
          <path
            d={`M${cx} ${Number(cy) + 22} Q${Number(cx) - 6} ${Number(cy) + 70} ${cx} 196`}
            className="stroke-muted-foreground/30"
            fill="none"
          />
          <ellipse cx={cx} cy={cy} rx="18" ry="22" className={String(cls)} />
        </g>
      ))}
      {/* Table */}
      <rect x="60" y="196" width="360" height="14" rx="4" className="fill-muted-foreground/25" />
      <rect x="80" y="210" width="10" height="70" className="fill-muted-foreground/20" />
      <rect x="390" y="210" width="10" height="70" className="fill-muted-foreground/20" />
      {/* Cake */}
      <rect x="196" y="150" width="88" height="46" rx="6" className="fill-card stroke-border" strokeWidth="1.5" />
      <rect
        x="212"
        y="122"
        width="56"
        height="30"
        rx="5"
        className="fill-brand-violet/20 stroke-border"
        strokeWidth="1.5"
      />
      <path d="M196 168 Q218 178 240 168 T284 168" className="stroke-primary/50" strokeWidth="3" fill="none" />
      {[224, 240, 256].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="106" width="4" height="16" rx="1" className="fill-primary/60" />
          <ellipse cx={x} cy="101" rx="3" ry="5" className="fill-amber-400" />
        </g>
      ))}
      {/* QR standee */}
      <path d="M108 196 L120 132 L156 132 L168 196 Z" className="fill-card stroke-border" strokeWidth="1.5" />
      <Qr x={122} y={142} size={32} />
      <text x="138" y="187" textAnchor="middle" className="fill-muted-foreground" fontSize="7">
        Party photos
      </text>
      <Arrow d="M170 150 C230 70 330 90 352 150" />
      <Phone x={340} y={100} scale={0.8} />
      <Label x={138} y={302} anchor="middle">
        QR standee on the cake table
      </Label>
      <Label x={366} y={302} anchor="middle">
        Parents find their child
      </Label>
    </Svg>
  );
}

/** Corporate: stage screen showing the QR code between sessions, audience rows, a badge. */
export function CorporateScene({ className }: SceneProps) {
  return (
    <Svg className={className}>
      <ArrowDef />
      <rect x="40" y="40" width="300" height="150" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="70" y="82" className="fill-foreground" fontSize="15" fontWeight="600">
        Get your event photos
      </text>
      <text x="70" y="102" className="fill-muted-foreground" fontSize="10">
        Scan, take a selfie, download.
      </text>
      <rect x="70" y="118" width="120" height="8" rx="4" className="fill-primary/25" />
      <rect x="70" y="134" width="90" height="8" rx="4" className="fill-muted" />
      <Qr x={236} y={66} size={84} />
      <rect x="20" y="190" width="340" height="12" rx="3" className="fill-muted-foreground/25" />
      <rect x="166" y="160" width="48" height="30" rx="4" className="fill-muted-foreground/30" />
      {/* Audience */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle
            key={`${row}-${i}`}
            cx={50 + i * 44 + (row % 2) * 22}
            cy={232 + row * 26}
            r="10"
            className={row === 1 && i === 3 ? "fill-primary/60" : "fill-muted-foreground/25"}
          />
        )),
      )}
      {/* Badge on a lanyard */}
      <path d="M396 40 L412 92 M440 40 L424 92" className="stroke-primary/50" strokeWidth="3" />
      <rect x="384" y="92" width="72" height="104" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
      <circle cx="420" cy="118" r="12" className="fill-muted" />
      <rect x="398" y="136" width="44" height="6" rx="3" className="fill-muted-foreground/30" />
      <Qr x={402} y={150} size={36} />
      <Arrow d="M180 266 C260 300 380 280 420 202" />
      <Label x={190} y={30} anchor="middle">
        QR on stage screens between sessions
      </Label>
      <Label x={420} y={222} anchor="middle">
        …and on badges
      </Label>
    </Svg>
  );
}

/** Award ceremony: spotlit stage, trophy handover, the QR code on the big screen. */
export function AwardScene({ className }: SceneProps) {
  return (
    <Svg className={className}>
      <ArrowDef />
      <defs>
        <linearGradient id="award-spot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="[stop-color:var(--brand-violet)]" stopOpacity="0.35" />
          <stop offset="1" className="[stop-color:var(--brand-violet)]" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M230 0 L270 0 L350 250 L150 250 Z" fill="url(#award-spot)" />
      <rect x="40" y="250" width="400" height="20" rx="4" className="fill-muted-foreground/25" />
      <rect x="20" y="270" width="440" height="50" className="fill-muted/60" />
      {/* Winner + presenter */}
      <Person x={222} y={180} tone="primary" scale={1.3} />
      <Person x={290} y={186} scale={1.15} />
      {/* Trophy */}
      <g transform="translate(248 150)">
        <path d="M0 0 H24 V10 Q24 26 12 28 Q0 26 0 10 Z" className="fill-amber-400" />
        <path
          d="M0 4 Q-8 4 -6 12 Q-4 18 2 18 M24 4 Q32 4 30 12 Q28 18 22 18"
          className="stroke-amber-400"
          strokeWidth="2"
          fill="none"
        />
        <rect x="9" y="28" width="6" height="8" className="fill-amber-400" />
        <rect x="4" y="36" width="16" height="5" rx="1" className="fill-amber-500" />
      </g>
      {/* Big screen */}
      <rect x="36" y="56" width="120" height="132" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
      <Qr x={56} y={72} size={80} />
      <text x="96" y="174" textAnchor="middle" className="fill-muted-foreground" fontSize="9">
        Your stage photos
      </text>
      <Arrow d="M156 120 C250 60 340 80 362 126" />
      <Phone x={366} y={110} scale={0.9} label="Your moment" />
      <Label x={96} y={42} anchor="middle">
        QR on the big screen
      </Label>
      <Label x={395} y={240} anchor="middle">
        Winner&apos;s phone
      </Label>
    </Svg>
  );
}

/** Sports: cricket ground, scoreboard with the QR code, a parent's phone. */
export function SportsScene({ className }: SceneProps) {
  return (
    <Svg className={className}>
      <ArrowDef />
      <ellipse cx="190" cy="220" rx="180" ry="86" className="fill-after/70 stroke-after-border" strokeWidth="1.5" />
      <ellipse cx="190" cy="220" rx="120" ry="54" fill="none" className="stroke-after-border" strokeDasharray="4 6" />
      <rect x="168" y="176" width="44" height="88" rx="3" className="fill-amber-200/70 dark:fill-amber-200/30" />
      {[0, 1].map((end) =>
        [0, 1, 2].map((s) => (
          <rect
            key={`${end}-${s}`}
            x={180 + s * 8}
            y={end ? 252 : 176}
            width="3"
            height="14"
            className="fill-muted-foreground/60"
          />
        )),
      )}
      <Person x={150} y={196} tone="primary" />
      <path d="M160 214 L176 198" className="stroke-amber-500" strokeWidth="4" strokeLinecap="round" />
      <circle cx="226" cy="214" r="4" className="fill-before-ink" />
      {/* Scoreboard */}
      <rect x="300" y="24" width="160" height="112" rx="8" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="316" y="50" className="fill-foreground" fontSize="12" fontWeight="600">
        Match day photos
      </text>
      <text x="316" y="68" className="fill-muted-foreground" fontSize="9">
        Find yours with a selfie
      </text>
      <rect x="316" y="80" width="70" height="8" rx="4" className="fill-primary/25" />
      <rect x="316" y="96" width="50" height="8" rx="4" className="fill-muted" />
      <Qr x={398} y={66} size={52} />
      <rect x="370" y="136" width="8" height="40" className="fill-muted-foreground/30" />
      <Arrow d="M380 180 C390 210 400 220 404 232" />
      <Phone x={372} y={190} scale={0.95} label="Your shots" />
      <Label x={380} y={14} anchor="middle">
        QR on the scoreboard
      </Label>
      <Label x={190} y={30} anchor="middle">
        Every match day, one gallery
      </Label>
    </Svg>
  );
}

/** Photographers: camera → upload → face-sorted gallery → every guest's phone. */
export function PhotographerScene({ className }: SceneProps) {
  return (
    <Svg className={className}>
      <ArrowDef />
      {/* Camera */}
      <g transform="translate(20 116)">
        <rect x="0" y="12" width="84" height="58" rx="10" className="fill-muted-foreground/30" />
        <rect x="14" y="2" width="26" height="14" rx="4" className="fill-muted-foreground/30" />
        <circle cx="46" cy="41" r="20" className="fill-card stroke-border" strokeWidth="2" />
        <circle cx="46" cy="41" r="11" className="fill-primary/40" />
      </g>
      <Label x={62} y={212} anchor="middle">
        Your shoot
      </Label>
      <Arrow d="M110 156 L146 156" />
      {/* Upload card */}
      <g transform="translate(152 108)">
        <rect width="104" height="96" rx="10" className="fill-card stroke-border" strokeWidth="1.5" />
        <path
          d="M52 22 L52 52 M40 34 L52 22 L64 34"
          className="stroke-primary"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="16" y="64" width="72" height="7" rx="3.5" className="fill-muted" />
        <rect x="16" y="64" width="52" height="7" rx="3.5" className="fill-primary/60" />
        <text x="52" y="86" textAnchor="middle" className="fill-muted-foreground" fontSize="8">
          Faces detected
        </text>
      </g>
      <Label x={204} y={226} anchor="middle">
        Upload once
      </Label>
      <Arrow d="M262 156 L292 156" />
      {/* Gallery sorted by face */}
      <g transform="translate(298 96)">
        <rect width="80" height="120" rx="10" className="fill-card stroke-border" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect
            key={i}
            x={8 + (i % 3) * 22}
            y={10 + Math.floor(i / 3) * 34}
            width="20"
            height="30"
            rx="3"
            className={[0, 4, 8].includes(i) ? "fill-primary/40" : "fill-muted"}
          />
        ))}
      </g>
      <Label x={338} y={238} anchor="middle">
        AI photo gallery
      </Label>
      {/* Guests */}
      <Arrow d="M382 128 C410 96 420 84 432 78" />
      <Arrow d="M382 156 L428 156" />
      <Arrow d="M382 184 C410 216 420 228 432 234" />
      {[48, 136, 222].map((y) => (
        <g key={y} transform={`translate(436 ${y})`}>
          <rect width="30" height="52" rx="6" className="fill-card stroke-border" strokeWidth="1.5" />
          <circle cx="15" cy="16" r="6" className="fill-primary/40" />
          <rect x="6" y="28" width="18" height="14" rx="2" className="fill-muted" />
        </g>
      ))}
      <Label x={240} y={292} anchor="middle">
        Every guest gets their own photos — you send one link
      </Label>
    </Svg>
  );
}

/** Event planners: venue floor plan with QR touchpoints from arrival to exit. */
export function PlannerScene({ className }: SceneProps) {
  const pins: [number, number, string][] = [
    [84, 236, "Registration"],
    [214, 150, "Tables"],
    [372, 86, "Stage screen"],
    [400, 250, "Exit / thank-you"],
  ];
  return (
    <Svg className={className}>
      <rect x="30" y="30" width="420" height="250" rx="12" className="fill-card stroke-border" strokeWidth="1.5" />
      {/* Stage */}
      <rect x="300" y="48" width="134" height="60" rx="6" className="fill-brand-violet/15 stroke-brand-violet/40" />
      {/* Registration desk */}
      <rect x="50" y="216" width="70" height="20" rx="4" className="fill-muted-foreground/25" />
      {/* Round tables */}
      {[
        [150, 100],
        [220, 100],
        [150, 170],
        [220, 170],
        [290, 170],
        [290, 236],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="20" className="fill-muted" />
          {[0, 1, 2, 3, 4, 5].map((s) => (
            <circle
              key={s}
              cx={cx + Math.cos((s * Math.PI) / 3) * 27}
              cy={cy + Math.sin((s * Math.PI) / 3) * 27}
              r="4"
              className="fill-muted-foreground/25"
            />
          ))}
        </g>
      ))}
      {/* Guest path */}
      <path
        d="M40 262 C120 262 120 200 200 200 S330 140 372 112 M372 112 C420 160 420 220 400 250"
        className="stroke-primary/50"
        strokeWidth="2"
        strokeDasharray="5 6"
        fill="none"
      />
      {pins.map(([x, y, label]) => (
        <g key={label}>
          <path d={`M${x} ${y} l-11 -16 a13 13 0 1 1 22 0 z`} className="fill-primary" />
          <rect x={x - 7} y={y - 32} width="14" height="14" rx="2" fill="white" />
          <Qr x={x - 6} y={y - 31} size={12} />
          <text x={x} y={y + 14} textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontWeight="500">
            {label}
          </text>
        </g>
      ))}
      <Label x={240} y={306} anchor="middle">
        One QR code, placed wherever guests pause
      </Label>
    </Svg>
  );
}
