import { ArrowDown, Check, Clock, LockKeyhole, Link2Off, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GoogleDriveLogo, WeTransferLogo, WhatsAppLogo } from "./brand-icons";
import { PendriveSvg } from "./pain-illustrations";
import { PhotoTile, QrPattern } from "./primitives";

/**
 * Closing-CTA visual: the old delivery methods (pendrive, Google Drive, WhatsApp, WeTransfer)
 * get crossed out one by one, then a single Snapdaps QR card takes over. Pure CSS loop
 * (`.old-card`, `.qr-card` in globals.css), static under reduced motion. Services are named with
 * their own marks (components/mock/brand-icons.tsx). Decorative: the CTA copy carries the message.
 *
 * Built for the dark CTA card (white-on-ink), so colours are fixed rather than themed.
 */

const OLD = [
  {
    key: "pendrive",
    label: "Pendrive",
    note: "Courier · 12 days",
    noteIcon: Clock,
    art: <PendriveSvg className="w-8" />,
    tilt: "-rotate-3",
  },
  {
    key: "drive",
    label: "Google Drive link",
    note: "Request access",
    noteIcon: LockKeyhole,
    art: <GoogleDriveLogo className="size-6" />,
    tilt: "rotate-2",
  },
  {
    key: "whatsapp",
    label: "WhatsApp forwards",
    note: "Compressed photos",
    noteIcon: X,
    art: <WhatsAppLogo className="size-6" />,
    tilt: "rotate-1",
  },
  {
    key: "wetransfer",
    label: "WeTransfer link",
    note: "Link expired",
    noteIcon: Link2Off,
    art: <WeTransferLogo className="size-7" />,
    tilt: "-rotate-2",
  },
];

export function OldWaySwap({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" data-nosnippet className={cn("relative mx-auto w-full max-w-md select-none", className)}>
      {/* The old way: a messy pile, crossed out in turn */}
      <ul className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {OLD.map((o, i) => {
          const NoteIcon = o.noteIcon;
          return (
            <li
              key={o.key}
              className={cn("old-card relative rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10 backdrop-blur-sm", o.tilt)}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm">{o.art}</div>
              <p className="mt-2 text-[13px] font-semibold leading-tight text-white">{o.label}</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-white/55">
                <NoteIcon className="size-3" /> {o.note}
              </p>
              {/* strike line + ✕ badge, animated in */}
              <span className="old-strike pointer-events-none absolute left-3 right-3 top-1/2 h-0.5 origin-left rounded-full bg-[#ff6b6b]" />
              <span className="old-x absolute -right-1.5 -top-1.5 flex size-6 items-center justify-center rounded-full bg-destructive text-white ring-4 ring-ink-surface">
                <X className="size-3.5" strokeWidth={3} />
              </span>
            </li>
          );
        })}
      </ul>

      <div className="my-3 flex justify-center text-white/50">
        <span className="flex size-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
          <ArrowDown className="size-4" />
        </span>
      </div>

      {/* The Snapdaps way: one QR card */}
      <div className="qr-card relative flex items-center gap-4 rounded-2xl bg-white p-3.5 text-ink-surface shadow-[0_24px_60px_-20px_rgb(94_93_249/0.7)]">
        <div className="shrink-0 rounded-xl border border-black/10 p-1.5">
          <QrPattern className="size-[4.5rem]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-tight">Scan &amp; take a selfie 📸</p>
          <p className="mt-1 text-xs text-black/55">One QR code for every guest</p>
          <div className="mt-2.5 flex items-center gap-1.5">
            {[2, 4, 0].map((s, i) => (
              <PhotoTile key={i} seed={s} people={1} className={cn("w-8 rounded", i === 2 && "hidden sm:block")} />
            ))}
            <span className="ml-1 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#f0fff4] px-2 py-0.5 text-[11px] font-semibold text-[#15803d]">
              <Check className="size-3" strokeWidth={3} /> Your photos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
