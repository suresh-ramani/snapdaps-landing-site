import { BadgeCheck, Play } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import {
  verifiedNote,
  videoKey,
  videoTestimonials,
  videoTestimonialsHeading,
  type VideoTestimonial,
} from "@/content/video-testimonials";
import { videoLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "./video-player";

/**
 * Customer video testimonials (data in content/video-testimonials.ts).
 *
 * - VideoPlayer: MP4s autoplay muted and looped while on screen (not under reduced motion);
 *   YouTube links stay click-to-play in the privacy-enhanced embed.
 * - Captions: required `.vtt` for real MP4 videos; for YouTube, add them in YouTube Studio.
 * - "Verified · Not AI-generated" shows only on videos marked `verified`, and the sentence
 *   explaining what that means sits under the grid (each badge points to it), so the claim is
 *   explained rather than just asserted.
 * - VideoObject JSON-LD per video, so search engines can show them as video results.
 * - Hidden on the live site while the list is empty; `npm run dev` shows placeholder slots.
 * - Entries with `placeholder: true` (layout previews) render only in dev and never get schema.
 *
 * Renders a heading (h3 by default, `headingAs="h2"` as a page section) + grid, inside a <Section>
 * (SocialProof uses it; /pricing gives it its own band, skipped via `hasVideoTestimonials()`).
 */
/** True when the testimonials block would render (real videos, or dev placeholders) — so a page can skip its band. */
export function hasVideoTestimonials(videos: VideoTestimonial[] = videoTestimonials) {
  return process.env.NODE_ENV !== "production" || videos.some((v) => !v.placeholder);
}

export function VideoTestimonials({
  videos = videoTestimonials,
  heading = videoTestimonialsHeading,
  headingAs: Heading = "h3",
  className,
}: {
  videos?: VideoTestimonial[];
  heading?: string;
  /** h2 when the block is a page section of its own (e.g. /pricing), h3 inside SocialProof. */
  headingAs?: "h2" | "h3";
  className?: string;
}) {
  const isDev = process.env.NODE_ENV !== "production";
  // Placeholder entries are a dev-only layout preview: never on the live site.
  videos = isDev ? videos : videos.filter((v) => !v.placeholder);
  if (!videos.length && !isDev) return null;
  const anyVerified = videos.some((v) => v.verified);

  return (
    <div className={cn("text-left", className)}>
      <Heading
        id="video-testimonials-title"
        className={cn(
          "text-center font-semibold tracking-tight",
          Heading === "h2" ? "text-3xl md:text-[2.6rem] md:leading-[1.1]" : "text-xl md:text-2xl",
        )}
      >
        {heading}
      </Heading>

      {!videos.length ? (
        <Placeholder />
      ) : (
        <>
          <RevealGroup as="ul" stagger={0.1} className="mt-8 grid gap-4 md:grid-cols-3">
            {videos.map((v) => (
              <Reveal as="li" key={videoKey(v)} className="surface flex flex-col overflow-hidden">
                <div className="relative bg-muted" style={{ aspectRatio: v.aspect ?? "4/5" }}>
                  <VideoPlayer video={v} />
                </div>
                <figure className="flex flex-1 flex-col gap-3 p-5">
                  <blockquote className="text-[15px] leading-relaxed">“{v.quote}”</blockquote>
                  <figcaption className="mt-auto flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm">
                      <span className="block font-semibold">{v.name}</span>
                      <span className="text-muted-foreground">
                        {v.role}
                        {v.city && `, ${v.city}`}
                      </span>
                    </span>
                    {v.verified && <VerifiedBadge />}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </RevealGroup>
          {anyVerified && (
            <p id="verified-note" className="mx-auto mt-4 max-w-2xl text-center text-xs text-muted-foreground">
              {verifiedNote}
            </p>
          )}
          {videos
            .filter((v) => !v.placeholder)
            .map((v) => (
              <JsonLd key={videoKey(v)} data={videoLd(v)} />
            ))}
        </>
      )}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span
      aria-describedby="verified-note"
      className="inline-flex items-center gap-1 rounded-full bg-after px-2 py-0.5 text-xs font-medium text-after-ink ring-1 ring-after-border"
    >
      <BadgeCheck className="size-3.5" aria-hidden="true" />
      Verified · Not AI-generated
    </span>
  );
}

/** Dev only: where videos will go, until real ones are added. */
function Placeholder() {
  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <li key={i} className="flex flex-col overflow-hidden rounded-xl border border-dashed">
          <div className="flex aspect-[4/5] items-center justify-center bg-muted/50">
            <span className="flex size-14 items-center justify-center rounded-full bg-card text-muted-foreground ring-1 ring-border">
              <Play className="ml-0.5 size-6" aria-hidden="true" />
            </span>
          </div>
          <div className="space-y-2 p-5 text-sm text-muted-foreground">
            <p>Placeholder: video testimonial — add real customer videos in content/video-testimonials.ts.</p>
            <span className="inline-flex items-center gap-1 rounded-full border border-dashed px-2 py-0.5 text-xs">
              <BadgeCheck className="size-3.5" aria-hidden="true" /> Verified · Not AI-generated (only when checked)
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
