import { Check, ScanFace, UploadCloud, Users } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";
import { Face, PhotoTile } from "@/components/mock/primitives";
import { cn } from "@/lib/utils";

/**
 * "How Snapdaps works" in one picture: event photos → Snapdaps AI → each guest's own photos.
 *
 * Pattern after Magic UI's AnimatedBeam (MIT, github.com/magicuidesign/magicui) and Tailark's
 * integrations hub (MIT, github.com/tailark/blocks). Unlike Magic UI's version this needs no
 * `motion` package: beams are fixed SVG paths in a shared coordinate system, animated with CSS
 * (`.beam-pulse` in globals.css), and static when reduced motion is on.
 *
 * Desktop: horizontal hub-and-spoke. Mobile: vertical, one guest per row.
 * The step captions are real text, so the idea reads even without the animation.
 */

export type FlowGuest = { name: string; count: number; seed: number };

const defaultGuests: FlowGuest[] = [
  { name: "Riya", count: 38, seed: 2 },
  { name: "Arjun", count: 52, seed: 0 },
  { name: "Meera", count: 21, seed: 4 },
];

const steps = [
  { icon: UploadCloud, title: "You upload once", body: "All the event photos, in one go." },
  { icon: ScanFace, title: "AI matches every face", body: "No tagging, no sorting." },
  { icon: Users, title: "Each guest gets their photos", body: "With a selfie, in seconds." },
];

export function SolutionFlow({
  photoCount = "4,812",
  guests = defaultGuests,
  className,
}: {
  photoCount?: string;
  guests?: FlowGuest[];
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {/* Step captions — a real sequence, so numbered */}
      <ol className="grid gap-4 text-left md:grid-cols-3 md:gap-8">
        {steps.map((s, i) => (
          <li key={s.title} className={cn("flex items-start gap-3", i === 1 && "md:justify-center", i === 2 && "md:justify-end")}>
            <span className="icon-tile size-9 text-sm font-semibold" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold">{s.title}</p>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop diagram */}
      <div aria-hidden="true" className="relative mt-4 hidden aspect-[1000/340] md:block">
        <Beams />
        <div className="absolute left-0 top-1/2 w-[29%] -translate-y-1/2">
          <PhotosNode photoCount={photoCount} />
        </div>
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-[38%]">
          <HubNode />
        </div>
        {guests.slice(0, 3).map((g, i) => (
          <div
            key={g.name}
            className="absolute right-0 w-[29%] -translate-y-1/2"
            style={{ top: `${[16.2, 50, 83.8][i]}%` }}
          >
            <GuestNode guest={g} />
          </div>
        ))}
      </div>

      {/* Mobile diagram */}
      <div aria-hidden="true" className="mt-8 flex flex-col items-center md:hidden">
        <PhotosNode photoCount={photoCount} className="w-full max-w-xs" />
        <VerticalBeam />
        <HubNode />
        <VerticalBeam delay="0.6s" />
        <div className="grid w-full max-w-xs gap-2">
          {guests.slice(0, 3).map((g) => (
            <GuestNode key={g.name} guest={g} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Beams --------------------------------- */

// Shared 1000×340 coordinate system; node boxes above are placed to match these endpoints.
const BEAMS = [
  // Beams run into the hub's centre; the hub sits on top, so they always meet its edge.
  { d: "M 290 170 L 500 170", delay: "0s" },
  { d: "M 500 170 C 620 170 620 55 710 55", delay: "1s" },
  { d: "M 500 170 L 710 170", delay: "1.2s" },
  { d: "M 500 170 C 620 170 620 285 710 285", delay: "1.4s" },
];

function Beams() {
  return (
    <svg viewBox="0 0 1000 340" className="absolute inset-0 size-full" fill="none">
      <defs>
        <linearGradient id="beam-gradient" gradientUnits="userSpaceOnUse" x1="290" y1="0" x2="710" y2="0">
          <stop offset="0" stopColor="var(--brand-blue)" />
          <stop offset="0.5" stopColor="var(--brand-indigo)" />
          <stop offset="1" stopColor="var(--brand-violet)" />
        </linearGradient>
      </defs>
      {BEAMS.map((b) => (
        <g key={b.d}>
          <path d={b.d} stroke="url(#beam-gradient)" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />
          <path
            d={b.d}
            pathLength={100}
            stroke="url(#beam-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="beam-pulse"
            style={{ "--beam-delay": b.delay } as React.CSSProperties}
          />
        </g>
      ))}
    </svg>
  );
}

function VerticalBeam({ delay = "0s" }: { delay?: string }) {
  return (
    <svg viewBox="0 0 4 56" className="h-14 w-1" fill="none">
      <defs>
        <linearGradient id="beam-gradient-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--brand-blue)" />
          <stop offset="1" stopColor="var(--brand-violet)" />
        </linearGradient>
      </defs>
      <path d="M 2 0 L 2 56" stroke="url(#beam-gradient-v)" strokeOpacity="0.3" strokeWidth="2" />
      <path
        d="M 2 0 L 2 56"
        pathLength={100}
        stroke="url(#beam-gradient-v)"
        strokeWidth="3"
        strokeLinecap="round"
        className="beam-pulse"
        style={{ "--beam-delay": delay, "--beam-duration": "2.2s" } as React.CSSProperties}
      />
    </svg>
  );
}

/* --------------------------------- Nodes --------------------------------- */

function PhotosNode({ photoCount, className }: { photoCount: string; className?: string }) {
  return (
    <div className={cn("surface p-3", className)}>
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <PhotoTile key={i} seed={i + 1} people={((i % 3) + 1) as 1 | 2 | 3} className="aspect-square" />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between px-1 text-sm">
        <span className="font-semibold">{photoCount} photos</span>
        <span className="text-xs text-muted-foreground">Wedding · 6 folders</span>
      </div>
    </div>
  );
}

function HubNode() {
  return (
    <div className="flex flex-col items-center">
      <div className="hub-pulse rounded-full bg-brand-gradient p-[3px]">
        <div className="flex size-24 items-center justify-center rounded-full bg-card lg:size-28">
          <LogoMark className="h-12 lg:h-14" />
        </div>
      </div>
      <span className="mt-3 rounded-full bg-purple-soft px-3 py-1 text-xs font-medium text-purple">
        Matching faces…
      </span>
    </div>
  );
}

function GuestNode({ guest }: { guest: FlowGuest }) {
  return (
    <div className="surface flex items-center gap-3 p-2.5 pr-3">
      <Face seed={guest.seed} className="size-10 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{guest.name}</p>
        <p className="text-xs text-muted-foreground">{guest.count} photos found</p>
      </div>
      <div className="flex -space-x-2">
        {[0, 1, 2].map((k) => (
          <PhotoTile
            key={k}
            seed={guest.seed + k * 3}
            className="aspect-square size-7 rounded-md ring-2 ring-card"
          />
        ))}
      </div>
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-after text-after-ink">
        <Check className="size-3" />
      </span>
    </div>
  );
}
