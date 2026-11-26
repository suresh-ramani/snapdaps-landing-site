"use client";

import { Check, Download, FolderOpen, Lock, Share2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GoogleDriveLogo } from "@/components/mock/brand-icons";
import { useEventSample } from "@/components/mock/photo-pool";
import { ProfilePic, PhoneFrame, PhotoTile } from "@/components/mock/primitives";
import { GUEST_SELFIE_SEED } from "@/components/mock/profiles";
import { cn } from "@/lib/utils";

/**
 * Pictures for the feature bento (`FeatureBento`), composed as one set after the stageshow bento
 * rules (.claude/skills/stageshow/references/bento.md): one hero (face search), and the rest each
 * a single component or object at real size, cropped by the tile edge — never a whole card
 * floating with even margins. Each thing is said once: the hero owns the photo grid, the phone
 * shows one photo, galleries show only folders, upload only one upload row.
 * Photos come from the page's pool (`<PhotoPool>`), so use-case pages show their own event.
 * All decorative: the tile's own heading and sentence carry the meaning.
 */

/**
 * Hero: the selfie, and the guest's photos ticked in two rows of fixed-size tiles that fill column
 * by column, so the last (partial) column is the one the right edge crops.
 */
export function FaceSearchVisual() {
  const { pool } = useEventSample();
  const photos = pool.slice(0, Math.min(6, pool.length - 1));
  return (
    <div className="flex h-full gap-5 pl-6 pt-6 sm:gap-8 md:pl-8 md:pt-8">
      <div className="flex shrink-0 flex-col items-center gap-3">
        <div className="relative size-16 overflow-hidden rounded-full ring-2 ring-primary ring-offset-4 ring-offset-muted [--scan-distance:4rem] sm:size-24 sm:[--scan-distance:6rem]">
          <ProfilePic seed={GUEST_SELFIE_SEED} className="size-full rounded-none" />
          <span className="animate-scan absolute inset-x-0 top-0 h-0.5 bg-primary shadow-[0_0_10px_2px_var(--primary)]" />
        </div>
        <span className="rounded-full bg-card px-2.5 py-1 text-xs font-medium shadow-sm ring-1 ring-border">Your selfie</span>
      </div>
      <div className="grid shrink-0 auto-cols-[6.5rem] grid-flow-col grid-rows-2 content-start gap-2 sm:auto-cols-[8rem] sm:gap-3 md:auto-cols-[10rem] lg:auto-cols-[12rem]">
        {photos.map((photo, i) => (
          <div key={photo} className="animate-pop relative" style={{ animationDelay: `${300 + i * 90}ms` }}>
            <PhotoTile photo={photo} sizes="(min-width: 1024px) 192px, 160px" className="rounded-lg" />
            <span className="absolute right-1.5 top-1.5 flex size-5 sm:right-2 sm:top-2 sm:size-6 items-center justify-center rounded-full bg-after-ink text-white shadow-sm ring-2 ring-white">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Privacy: one fanned stack of prints rising from the bottom edge. The guest's own photo is in front,
 * clear and ticked; the two behind are other guests' photos, blurred and locked. Says "you see only
 * your photos" without repeating the hero's grid.
 */
export function PrivacyVisual() {
  const { pool } = useEventSample();
  const [mine, left, right] = [pool[1 % pool.length], pool[3 % pool.length], pool[4 % pool.length]];
  const locked = (photo: (typeof pool)[number], side: "left" | "right") => (
    <div
      className={cn(
        "relative w-24 shrink-0 translate-y-4 sm:w-28",
        side === "left" ? "-mr-12 -rotate-[8deg]" : "order-last -ml-12 rotate-[8deg]",
      )}
    >
      <PhotoTile photo={photo} sizes="112px" className="rounded-lg ring-1 ring-border [&_img]:scale-125 [&_img]:blur-lg" />
      <span className="absolute inset-0 rounded-lg bg-card/35" />
      <span
        className={cn(
          "absolute top-6 flex size-7 items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm ring-1 ring-border",
          side === "left" ? "left-2.5" : "right-2.5",
        )}
      >
        <Lock className="size-3.5" />
      </span>
    </div>
  );
  return (
    <div className="flex h-full items-end justify-center pt-5">
      <div className="flex translate-y-6 items-end">
        {locked(left, "left")}
        <div className="relative z-10 w-32 shrink-0 sm:w-36">
          <PhotoTile
            photo={mine}
            sizes="144px"
            className="rounded-lg shadow-[0_18px_36px_-16px_rgb(21_23_30/0.5)] ring-4 ring-card"
          />
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-after-ink py-0.5 pl-1 pr-2 text-xs font-semibold text-white shadow-sm">
            <span className="flex size-4 items-center justify-center rounded-full bg-white/25">
              <Check className="size-3" strokeWidth={3} />
            </span>
            Yours
          </span>
        </div>
        {locked(right, "right")}
      </div>
    </div>
  );
}

/** Galleries: only the folder filter, large, running off the right edge. */
export function FoldersVisual() {
  const { folders } = useEventSample();
  const rows = [
    ["All", folders[0], folders[1]],
    [folders[2], folders[3]],
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3 pl-6">
      {rows.map((row, r) => (
        <div key={r} className={cn("flex gap-2.5", r === 1 && "pl-10")}>
          {row.map((f) => {
            const active = f === folders[2];
            return (
              <span
                key={f}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-base font-medium shadow-sm",
                  active ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-border",
                )}
              >
                {f !== "All" && <FolderOpen className={cn("size-4", !active && "text-muted-foreground")} />}
                {f}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** Upload: one upload row at real size, entering from the right edge. */
export function UploadVisual() {
  const { folders } = useEventSample();
  return (
    <div className="flex h-full flex-col justify-center gap-3 pl-6">
      <span className="flex w-fit items-center gap-2 rounded-full bg-card px-3 py-1.5 text-sm shadow-sm ring-1 ring-border">
        <GoogleDriveLogo className="size-4" /> Google Drive folder
      </span>
      <div className="w-[115%] rounded-xl bg-card p-4 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <UploadCloud className="size-5 text-primary" />
          </span>
          <div className="min-w-0">
            <p className="font-medium">{folders[2]}</p>
            <p className="text-sm text-muted-foreground">Uploading…</p>
          </div>
        </div>
        <Progress
          value={64}
          className="upload-fill mt-4 h-2"
          style={{ "--fill-from": "-36%" } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

/** Mobile: a phone rising from the bottom edge, one photo open under its download button. */
export function PhoneVisual() {
  const { pool } = useEventSample();
  return (
    <div className="flex h-full justify-center pt-6">
      <PhoneFrame className="h-[26rem] w-[13.5rem] shrink-0 shadow-[0_20px_40px_-20px_rgb(21_23_30/0.4)]">
        <div className="flex flex-col gap-3 bg-card px-3 pb-3 pt-8">
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              <Download /> Download
            </Button>
            <Button size="sm" variant="outline" className="px-2.5">
              <Share2 />
            </Button>
          </div>
          <PhotoTile photo={pool[pool.length - 1]} sizes="200px" className="rounded-lg" />
        </div>
      </PhoneFrame>
    </div>
  );
}
