import { Download, Link2, QrCode, ScanFace } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";
import { cn } from "@/lib/utils";
import { WhatsAppLogo } from "./brand-icons";

/**
 * How guests get their photos, orbiting Snapdaps: QR code and secure link on the inner ring,
 * WhatsApp, selfie search and download on the outer ring (only ways the product really offers).
 *
 * Orbiting-circles pattern after Magic UI's OrbitingCircles (MIT,
 * https://github.com/magicuidesign/magicui), rebuilt as CSS (`.orbit-item` in globals.css):
 * transform-only keyframes, no JavaScript, no animation library. Rings turn in opposite
 * directions; under reduced motion every chip rests at its start position.
 * Icon-only bubbles (36px) like Magic UI's: with rings 40px apart and chips spread round each ring,
 * no two bubbles can touch at any point of the cycle (labelled pills did, most of the time).
 * Decorative — the surrounding card's heading and text say the same thing.
 */

type Chip = { label: string; icon: React.ReactNode; angle: number };

const inner: Chip[] = [
  { label: "QR code", icon: <QrCode className="size-4" />, angle: 30 },
  { label: "Secure link", icon: <Link2 className="size-4" />, angle: 210 },
];

const outer: Chip[] = [
  { label: "WhatsApp", icon: <WhatsAppLogo className="size-4" />, angle: 100 },
  { label: "Selfie search", icon: <ScanFace className="size-4 text-primary" />, angle: 220 },
  { label: "Download", icon: <Download className="size-4" />, angle: 340 },
];

function Ring({
  chips,
  radius,
  duration,
  reverse = false,
}: {
  chips: Chip[];
  radius: number;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-foreground/10"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      {chips.map((c) => (
        <div key={c.label} className="absolute left-1/2 top-1/2 size-0">
          <div
            className="orbit-item"
            style={
              {
                "--angle": `${c.angle}deg`,
                "--radius": `${radius}px`,
                "--orbit-duration": `${duration}s`,
                "--orbit-direction": reverse ? "reverse" : "normal",
              } as React.CSSProperties
            }
          >
            <span
              title={c.label}
              className="surface flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            >
              {c.icon}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export function ShareOrbit({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative mx-auto aspect-square w-full max-w-[13.5rem]", className)}>
      <Ring chips={outer} radius={92} duration={48} />
      <Ring chips={inner} radius={52} duration={32} reverse />
      {/* Hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="hub-pulse rounded-full bg-brand-gradient p-[3px]">
          <div className="flex size-14 items-center justify-center rounded-full bg-card">
            <LogoMark className="h-7" />
          </div>
        </div>
      </div>
    </div>
  );
}
