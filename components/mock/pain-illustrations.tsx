import {
  CalendarX,
  Clock,
  Folder,
  Frown,
  House,
  Images,
  LockKeyhole,
  Search,
  TrendingDown,
  Truck,
} from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { GoogleDriveLogo } from "./brand-icons";
import { WhatsAppChat } from "./whatsapp";
import { PhotoTile } from "./primitives";

/**
 * Picture-first illustrations for the five pain points (home "Still sharing event photos the
 * old way?"). Icons (lucide) and small hand-built SVGs carry the meaning; text is kept to a
 * word or two per badge. All decorative: the section's text says the same thing.
 */

export type PainKind = "search" | "calls" | "pendrive" | "drive" | "referrals";

export function PainIllustration({ kind }: { kind: PainKind }) {
  switch (kind) {
    case "search":
      return <EndlessSearch />;
    case "calls":
      return <FollowUps />;
    case "pendrive":
      return <PendriveRoute />;
    case "drive":
      return <MessyDrive />;
    case "referrals":
      return <LostReferrals />;
  }
}

/* ------------------------------- shared bits ------------------------------- */

function Badge({
  icon: Icon,
  children,
  tone = "neutral",
  className,
}: {
  icon?: typeof Clock;
  children: React.ReactNode;
  tone?: "neutral" | "bad";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold shadow-[0_8px_20px_-10px_rgb(0_0_0/0.35)]",
        tone === "bad" ? "bg-before-ink text-white" : "bg-card text-foreground ring-1 ring-border",
        className,
      )}
    >
      {Icon && <Icon className="size-3.5" />}
      {children}
    </span>
  );
}

function IconTile({ icon: Icon, className }: { icon: typeof Clock; className?: string }) {
  return (
    <span className={cn("flex size-16 items-center justify-center rounded-2xl bg-card ring-1 ring-border", className)}>
      <Icon className="size-8 text-foreground/80" strokeWidth={1.6} />
    </span>
  );
}

function Dashes({ className }: { className?: string }) {
  return <span className={cn("h-0 flex-1 border-t-2 border-dashed border-before-ink/40", className)} />;
}

/* --------------------------- 1. endless searching -------------------------- */

function EndlessSearch() {
  return (
    <div className="relative">
      <div className="grid grid-cols-6 gap-1 rounded-2xl bg-card p-2 ring-1 ring-border">
        {Array.from({ length: 30 }).map((_, i) => (
          <PhotoTile key={i} seed={i} people={((i % 3) + 1) as 1 | 2 | 3} className="aspect-square" />
        ))}
      </div>
      {/* Magnifying lens hunting for one face */}
      <div className="absolute left-[38%] top-[26%] flex size-28 items-center justify-center rounded-full border-[6px] border-foreground/85 bg-white/30 backdrop-blur-[1px]">
        <span className="text-4xl font-black text-foreground/80">?</span>
        <span className="absolute -bottom-9 -right-7 h-12 w-3.5 rotate-[-45deg] rounded-full bg-foreground/85" />
      </div>
      <Badge icon={Images} className="absolute -top-3 left-3">
        4,812
      </Badge>
      <Badge icon={Search} tone="bad" className="absolute -bottom-3 right-4">
        Page 37 / 160
      </Badge>
    </div>
  );
}

/* ------------------------------- 2. follow-ups ----------------------------- */

function FollowUps() {
  return (
    <WhatsAppChat
      contact="Rahul"
      status="typing…"
      // Taller than the default: the whole run of messages and missed calls fits without clipping.
      screenHeight="h-[31rem]"
      unread={12}
      seed={0}
      items={[
        { type: "date", text: "Today" },
        { type: "in", text: "Hi Sir 🙏", time: "9:02 am" },
        { type: "in", text: "Sir, mera photo mila?", time: "9:03 am" },
        { type: "missed", time: "9:15 am" },
        { type: "in", text: "भैया, फ़ोटो कब तक मिलेंगी?", time: "11:20 am" },
        { type: "in", text: "Did you get our group pictures? 📸", time: "11:21 am" },
        { type: "missed", time: "12:40 pm" },
        { type: "missed", time: "12:41 pm" },
        { type: "in", text: "Sir??", time: "1:05 pm" },
      ]}
    />
  );
}

/* ------------------------------ 3. pendrive route -------------------------- */

export function PendriveSvg({ className }: { className?: string }) {
  // Unique gradient ids: the pendrive appears in more than one section per page.
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 132 56" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f3f46" />
          <stop offset="1" stopColor="#18181b" />
        </linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e4e4e7" />
          <stop offset="1" stopColor="#a1a1aa" />
        </linearGradient>
      </defs>
      {/* USB connector */}
      <rect x="92" y="14" width="36" height="28" rx="3" fill={`url(#${id}-metal)`} />
      <rect x="104" y="21" width="7" height="5" rx="1" fill="#52525b" />
      <rect x="104" y="30" width="7" height="5" rx="1" fill="#52525b" />
      {/* Body */}
      <rect x="4" y="6" width="92" height="44" rx="12" fill={`url(#${id}-body)`} />
      <circle cx="18" cy="28" r="5" fill="none" stroke="#71717a" strokeWidth="3" />
      <circle cx="80" cy="16" r="2.5" fill="#ef4444" />
      <rect x="34" y="22" width="36" height="12" rx="6" fill="#27272a" />
      <text x="52" y="31" textAnchor="middle" fontSize="8" fontWeight="700" fill="#a1a1aa" fontFamily="ui-sans-serif, system-ui">
        64 GB
      </text>
    </svg>
  );
}

function PendriveRoute() {
  return (
    <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
      <div className="flex items-center justify-center">
        <PendriveSvg className="w-40 drop-shadow-[0_10px_14px_rgb(0_0_0/0.25)]" />
      </div>
      <div className="mt-8 flex items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <IconTile icon={Truck} />
        </div>
        <Dashes />
        <div className="relative flex flex-col items-center gap-2">
          <IconTile icon={Clock} className="bg-before ring-before-border [&>svg]:text-before-ink" />
          <Badge tone="bad" className="absolute -top-7">
            12 days
          </Badge>
        </div>
        <Dashes />
        <div className="relative flex flex-col items-center gap-2">
          <IconTile icon={House} />
          <span className="absolute -right-3 -top-3 flex size-8 items-center justify-center rounded-full bg-before-ink text-white ring-4 ring-card">
            <CalendarX className="size-4" />
          </span>
        </div>
      </div>
      <div className="mt-3 flex justify-between px-1 text-[11px] font-medium text-muted-foreground">
        <span>Courier</span>
        <span>Waiting</span>
        <span>Not home</span>
      </div>
    </div>
  );
}

/* ------------------------------ 4. messy Drive ----------------------------- */

const folders = ["final_FINAL (2)", "New folder", "IMG_0001…", "Copy of pics", "DCIM_old", "untitled"];

function MessyDrive() {
  return (
    <div className="relative rounded-2xl bg-card p-5 pb-9 ring-1 ring-border">
      <div className="mb-4 flex items-center gap-2 border-b pb-3 text-sm font-medium">
        <GoogleDriveLogo className="size-5" /> My Drive <span className="text-muted-foreground">› Wedding_2025</span>
      </div>
      <ul className="grid grid-cols-3 gap-x-3 gap-y-4">
        {folders.map((f, i) => (
          <li key={f} className={cn("flex flex-col items-center gap-1", i % 2 === 1 && "translate-y-1.5 -rotate-3")}>
            <Folder className="size-14 fill-[#f6c66b] text-[#d89b2b]" strokeWidth={1.2} />
            <span className="max-w-full truncate text-[10px] text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>
      <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl bg-card py-2.5 pl-2.5 pr-4 shadow-[0_20px_40px_-16px_rgb(0_0_0/0.4)] ring-1 ring-border">
        <span className="flex size-10 items-center justify-center rounded-xl bg-before text-before-ink">
          <LockKeyhole className="size-5" />
        </span>
        <span className="whitespace-nowrap text-sm font-semibold">Access denied</span>
      </div>
    </div>
  );
}

/* ----------------------------- 5. lost referrals --------------------------- */

function StarSvg({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2.8l2.8 5.7 6.3.9-4.5 4.4 1.1 6.3L12 17.2l-5.7 2.9 1.1-6.3L2.9 9.4l6.3-.9L12 2.8z"
        fill={filled ? "#f5b301" : "none"}
        stroke={filled ? "#f5b301" : "#d4d4d8"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LostReferrals() {
  return (
    <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
      <div className="flex items-center gap-4">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-before text-before-ink">
          <Frown className="size-9" strokeWidth={1.6} />
        </span>
        <div>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarSvg key={i} filled={i < 2} className="size-7" />
            ))}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">“Waited 3 weeks 😞”</p>
        </div>
      </div>

      {/* Referrals falling off */}
      <div className="mt-6 rounded-xl bg-muted/60 p-4">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <TrendingDown className="size-4 text-before-ink" /> Referrals
          </span>
          <span className="text-before-ink">↓</span>
        </div>
        <svg viewBox="0 0 240 70" className="mt-2 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="ref-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--before-ink)" stopOpacity="0.25" />
              <stop offset="1" stopColor="var(--before-ink)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 12 C 40 10, 60 18, 90 26 S 150 44, 180 52 S 220 62, 240 64 L 240 70 L 0 70 Z" fill="url(#ref-fill)" />
          <path
            d="M0 12 C 40 10, 60 18, 90 26 S 150 44, 180 52 S 220 62, 240 64"
            fill="none"
            stroke="var(--before-ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="240" cy="64" r="4" fill="var(--before-ink)" />
        </svg>
      </div>
    </div>
  );
}
