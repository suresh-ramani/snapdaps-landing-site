"use client";

import { useEffect, useRef, useState } from "react";
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
 * Five-step workflow — scroll-spy layout adapted from Tailark's features blocks (MIT,
 * https://github.com/tailark/blocks). A sticky step list on the left highlights the step
 * in view; every step's content is always in the page (good for SEO and no-JS).
 */
export function WorkflowSteps({ stepHeading = "h3" }: { stepHeading?: "h2" | "h3" }) {
  const [active, setActive] = useState<WorkflowStepKey>(workflowSteps[0].key);
  const refs = useRef<Partial<Record<WorkflowStepKey, HTMLElement | null>>>({});
  const H = stepHeading;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.getAttribute("data-step") as WorkflowStepKey | null;
        if (id) setActive(id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.35, 0.55] },
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const go = (key: WorkflowStepKey) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    refs.current[key]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setActive(key);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
      <nav aria-label="Steps" className="sticky top-24 h-fit max-lg:hidden">
        <ol className="space-y-1 border-l">
          {workflowSteps.map((s, i) => (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => go(s.key)}
                aria-current={active === s.key ? "step" : undefined}
                className={cn(
                  "-ml-px flex w-full items-center gap-3 border-l py-2 pl-4 text-left text-sm transition-colors",
                  active === s.key
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] tabular-nums",
                    active === s.key ? "bg-brand-gradient text-white" : "bg-muted",
                  )}
                >
                  {i + 1}
                </span>
                {s.tab}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <ol className="flex flex-col gap-14 md:gap-24">
        {workflowSteps.map((s, i) => (
          <li
            key={s.key}
            data-step={s.key}
            ref={(el) => {
              refs.current[s.key] = el;
            }}
            className="grid scroll-mt-28 items-center gap-8 md:grid-cols-5 md:gap-12"
          >
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Step {i + 1}</p>
              <H className="mt-3 text-2xl font-semibold tracking-tight md:text-[1.75rem]">{s.title}</H>
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
              <div className="w-full">{visuals[s.key]}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
