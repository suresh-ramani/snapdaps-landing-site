"use client";

import { useId } from "react";
import { Check } from "lucide-react";
import {
  CreateEventCard,
  DetectFacesCard,
  FaceMatchCard,
  SelfieSearchCard,
  ShareCard,
  UploadCard,
} from "@/components/product/cards";
import { workflowSteps, type WorkflowStepKey } from "@/content/site";
import { cn } from "@/lib/utils";
import { LazyMount } from "./lazy-mount";
import { ScrollTrack, useScrollTabs } from "./scroll-tabs";

/** Measured height of each card on phones/tablets, reserved before it mounts so nothing shifts. */
const visualMinH: Record<WorkflowStepKey, string> = {
  create: "min-h-[19.25rem]",
  upload: "min-h-[28.5rem]",
  detect: "min-h-[20.75rem]",
  share: "min-h-[24rem]",
  selfie: "min-h-[24.5rem]",
};

const visuals: Record<WorkflowStepKey, React.ReactNode> = {
  create: <CreateEventCard className="mx-auto max-w-sm" />,
  upload: <UploadCard className="mx-auto max-w-sm" />,
  detect: <DetectFacesCard className="mx-auto max-w-sm" />,
  share: <ShareCard className="mx-auto max-w-72" />,
  selfie: (
    <div className="mx-auto grid max-w-md grid-cols-[1fr_1.2fr] items-start gap-3">
      <SelfieSearchCard className="mt-8" />
      <FaceMatchCard count={24} />
    </div>
  ),
};

/**
 * Five-step workflow as scroll-linked tabs (layout adapted from Tailark's features blocks, MIT,
 * https://github.com/tailark/blocks). Scroll behaviour comes from `scroll-tabs.tsx`, the same
 * engine as PainPoints.
 *
 * - Desktop: pinned step list on the left — every step's number, title and sentence stays
 *   visible, so fast scrolling still shows the whole flow. The panel on the right swaps the
 *   product visual and that step's bullet points as you scroll or pick a step. Panel layers are
 *   stacked in one grid cell, so the panel is as tall as the tallest step (no layout shift);
 *   inactive layers are `inert`.
 * - Mobile/tablet: every step stacked with all its text and visual (this is also what Google's
 *   mobile-first index reads, so nothing is hidden there).
 */
export type WorkflowStep = {
  key: WorkflowStepKey;
  title: string;
  subtitle: string;
  points: readonly string[];
};

export function WorkflowSteps({
  stepHeading = "h3",
  steps = workflowSteps,
}: {
  stepHeading?: "h2" | "h3";
  /**
   * Page-specific step copy (same 5 keys, so the product visuals still match). Defaults to the
   * shared `workflowSteps`; use-case pages pass their own wording so the copy isn't duplicated.
   */
  steps?: readonly WorkflowStep[];
}) {
  const workflowSteps = steps;
  const { active, tabProps, sliceRef, isNear } = useScrollTabs(workflowSteps.length);
  const panelId = useId();
  const H = stepHeading;

  return (
    <>
      {/* Desktop: pinned step list + panel */}
      <ScrollTrack
        count={workflowSteps.length}
        sliceRef={sliceRef}
        className="grid items-stretch gap-10 lg:grid-cols-[1fr_1.2fr] xl:gap-14"
      >
        <ol className="flex flex-col gap-1.5">
          {workflowSteps.map((s, i) => {
            const isActive = i === active;
            return (
              <li
                key={s.key}
                className={cn(
                  "relative rounded-xl px-4 py-3 motion-safe:transition-colors",
                  isActive ? "surface" : "hover:bg-card/60",
                )}
              >
                <div className="flex gap-3.5">
                  <span
                    className={cn(
                      "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums motion-safe:transition-colors",
                      isActive ? "bg-brand-gradient text-white" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <H className="text-lg font-semibold tracking-tight">
                      <button
                        {...tabProps(i, panelId)}
                        className={cn(
                          "rounded-md text-left outline-offset-4 after:absolute after:inset-0 after:rounded-xl after:content-['']",
                          !isActive && "text-muted-foreground",
                        )}
                      >
                        <span className="sr-only">Step {i + 1}: </span>
                        {s.title}
                      </button>
                    </H>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{s.subtitle}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div id={panelId} className="surface-soft grid overflow-hidden p-6">
          {workflowSteps.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.key}
                inert={!isActive}
                className={cn(
                  "flex flex-col gap-6 [grid-area:1/1] motion-safe:transition-[opacity,transform] motion-safe:duration-500",
                  isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                )}
              >
                {/* zoom (not scale) shrinks the layout box too, so the tallest card fits the 36rem block. */}
                <div aria-hidden="true" data-nosnippet className="flex flex-1 items-center">
                  <div className="w-full [zoom:0.85]">{isNear(i) && visuals[s.key]}</div>
                </div>
                <ul className="divide-y border-y text-[15px]">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 py-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-purple" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </ScrollTrack>

      {/* Mobile / tablet: every step stacked */}
      <ol className="flex flex-col gap-14 md:gap-24 lg:hidden">
        {workflowSteps.map((s, i) => (
          <li key={s.key} className="grid items-center gap-8 md:grid-cols-5 md:gap-12">
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Step {i + 1}</p>
              {/* The desktop list above holds the real <hN> for each step; this copy (shown below lg) is a
                  heading for screen readers only (role="heading"), so the page outline has each step once. */}
              <p role="heading" aria-level={H === "h2" ? 2 : 3} className="mt-3 text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                {s.title}
              </p>
              <p className="mt-3 text-lg text-muted-foreground">{s.subtitle}</p>
              <ul className="mt-6 divide-y border-y text-[15px]">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 py-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-purple" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-soft relative flex min-h-80 items-center overflow-hidden p-6 md:col-span-3 md:p-10">
              <LazyMount className={cn("w-full", visualMinH[s.key])} rootMargin="600px 0px">
                {visuals[s.key]}
              </LazyMount>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
