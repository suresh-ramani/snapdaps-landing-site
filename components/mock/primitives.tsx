import { cn } from "@/lib/utils";

/**
 * Building blocks for coded product illustrations. Everything here is decorative
 * (aria-hidden) and stands in for real screenshots until you have them — swap any
 * mock for <Image src="/screens/..." /> without changing the surrounding layout.
 */

// Warm event-photo tones: stage lights, marigold, dusk, garden, sangeet.
const TONES = [
  ["#f6b38a", "#c25b52"],
  ["#f3d48a", "#d98a2b"],
  ["#a9b8f0", "#4b5bb8"],
  ["#b8e0c2", "#3f8a63"],
  ["#f2a6c3", "#a9437a"],
  ["#c9b6f2", "#6b4fbf"],
  ["#f5c9a0", "#8f5a3a"],
  ["#9fd6e0", "#2f7f93"],
];

export function PhotoTile({
  seed = 0,
  className,
  people = 1,
  highlight = false,
  delayMs,
}: {
  seed?: number;
  className?: string;
  people?: 0 | 1 | 2 | 3;
  highlight?: boolean;
  /** Animation delay, for staggered entrances. */
  delayMs?: number;
}) {
  const [a, b] = TONES[seed % TONES.length];
  const xs = people === 1 ? [50] : people === 2 ? [36, 64] : people === 3 ? [26, 50, 74] : [];
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-md",
        highlight && "ring-2 ring-primary ring-offset-2 ring-offset-card",
        className,
      )}
      style={{
        background: `linear-gradient(160deg, ${a}, ${b})`,
        ...(delayMs !== undefined ? { animationDelay: `${delayMs}ms` } : {}),
      }}
    >
      <svg viewBox="0 0 100 125" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMax slice">
        <circle cx={20 + (seed % 5) * 14} cy={22} r={14} fill="#fff" opacity={0.18} />
        {xs.map((x, i) => (
          <g key={i} fill="#1b1d24" opacity={0.28}>
            <circle cx={x} cy={i === 1 && people === 3 ? 66 : 72} r={10} />
            <path d={`M${x - 20} 125 Q${x - 18} ${i === 1 && people === 3 ? 82 : 88} ${x} ${i === 1 && people === 3 ? 82 : 88} Q${x + 18} ${i === 1 && people === 3 ? 82 : 88} ${x + 20} 125 Z`} />
          </g>
        ))}
      </svg>
      {highlight && (
        <span className="absolute left-1.5 top-1.5 size-2.5 rounded-full border-2 border-white bg-primary" />
      )}
    </div>
  );
}

/** Abstract face: a person without a real likeness. */
export function Face({ seed = 0, className }: { seed?: number; className?: string }) {
  const skins = ["#e8b48f", "#c98e68", "#a8714f", "#f0c7a4", "#8d5b3f"];
  const hair = ["#2a1d17", "#3b2a22", "#1b1b1f", "#5a3a28", "#24201e"];
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("rounded-full", className)}>
      <rect width="64" height="64" fill={TONES[seed % TONES.length][0]} />
      <path d="M8 64c2-14 12-20 24-20s22 6 24 20z" fill={TONES[(seed + 3) % TONES.length][1]} />
      <circle cx="32" cy="28" r="13" fill={skins[seed % skins.length]} />
      <path d="M19 27c0-9 6-14 13-14s13 5 13 14c-3-5-8-7-13-7s-10 2-13 7z" fill={hair[seed % hair.length]} />
    </svg>
  );
}

export function PhoneFrame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative mx-auto w-[15.5rem] rounded-[2.2rem] border-[6px] border-[#15171e] bg-card p-0 shadow-[0_30px_60px_-24px_rgb(21_23_30/0.45)] dark:border-[#2a2e38]",
        className,
      )}
    >
      <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#15171e] dark:bg-[#2a2e38]" />
      <div className="overflow-hidden rounded-[1.7rem]">{children}</div>
    </div>
  );
}

export function BrowserFrame({
  url = "app.snapdaps.ai",
  className,
  children,
}: {
  url?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-[0_24px_60px_-28px_rgb(21_23_30/0.35)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b bg-muted/50 px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff6159]" />
        <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="size-2.5 rounded-full bg-[#28c941]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-background px-3 py-1 text-[11px] text-muted-foreground">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

/** Small floating label used on mocks ("24 photos found"). */
export function MockChip({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium shadow-[0_10px_30px_-12px_rgb(21_23_30/0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* QR pattern adapted from shadcn/ui's homepage QR card (MIT). Decorative only — not scannable. */
const qrRows = [
  "111111100101101111111",
  "100000101001001000001",
  "101110101111101011101",
  "101110100100001011101",
  "101110101010101011101",
  "100000100111001000001",
  "111111101010101111111",
  "000000001101000000000",
  "101011111001111010110",
  "010100001110010101001",
  "111010111011101111010",
  "001101000101000010101",
  "110111101111010111011",
  "000000001001010001010",
  "111111101101111101001",
  "100000100010001001111",
  "101110101011101110100",
  "101110100110100010011",
  "101110101000111101110",
  "100000101101000011001",
  "111111101011101101111",
];

export function QrPattern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 21 21" aria-hidden="true" className={cn("text-black", className)} shapeRendering="crispEdges">
      <rect width="21" height="21" fill="white" />
      {qrRows.map((row, y) =>
        [...row].map((c, x) => (c === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null)),
      )}
    </svg>
  );
}
