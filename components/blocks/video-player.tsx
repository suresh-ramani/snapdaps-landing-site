"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import {
  videoPoster,
  youtubeId,
  type SelfHostedVideo,
  type VideoTestimonial,
  type YouTubeVideo,
} from "@/content/video-testimonials";

/**
 * - MP4 testimonials autoplay muted and looped while the card is on screen, like a social
 *   feed: IntersectionObserver plays them in view and pauses them out of view, and
 *   `preload="none"` means nothing downloads before that. Native controls let people unmute.
 *   Under reduced motion they don't autoplay — the controls are there to press play.
 * - YouTube testimonials stay click-to-play: until someone presses play the page loads only
 *   the thumbnail — no YouTube scripts or cookies — then the youtube-nocookie embed opens with
 *   captions on and focus moves to it.
 */
export function VideoPlayer({ video }: { video: VideoTestimonial }) {
  return video.src !== undefined ? <AutoplayVideo video={video} /> : <YouTubeFacade video={video} />;
}

// prefers-reduced-motion as an external store: true on the server (no autoplay until known).
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function AutoplayVideo({ video }: { video: SelfHostedVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => true,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    // React doesn't reliably reflect `muted` to the DOM; browsers only allow autoplay when muted.
    el.muted = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.pause();
    };
  }, [reduceMotion]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      controls
      // Always "none": the server can't know the motion setting, and anything else would start
      // downloading every video before the page has even hydrated.
      preload="none"
      poster={video.poster}
      aria-label={`Video testimonial: ${video.name}, ${video.role} (muted)`}
      className="absolute inset-0 size-full bg-black object-cover"
    >
      {video.av1 && <source src={video.av1} type='video/mp4; codecs="av01.0.05M.08"' />}
      {video.webm && <source src={video.webm} type="video/webm" />}
      <source src={video.src} type="video/mp4" />
      {video.captions && (
        <track
          kind="captions"
          src={video.captions}
          srcLang={video.captionsLang ?? "en"}
          label={video.captionsLang === "hi" ? "हिन्दी" : "English"}
          default
        />
      )}
    </video>
  );
}

function YouTubeFacade({ video }: { video: YouTubeVideo }) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const label = `${video.name}, ${video.role}`;
  const ytId = youtubeId(video.youtube);
  const poster = videoPoster(video);

  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  if (playing && ytId) {
    const params = new URLSearchParams({ autoplay: "1", rel: "0", playsinline: "1", cc_load_policy: "1", modestbranding: "1" });
    return (
      <iframe
        ref={frameRef}
        src={`https://www.youtube-nocookie.com/embed/${ytId}?${params}`}
        title={`Video testimonial: ${label}`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 size-full bg-black"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video testimonial: ${label}`}
      className="group absolute inset-0 size-full outline-offset-[-4px]"
    >
      {poster && <Image src={poster} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />}
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink-surface shadow-lg motion-safe:transition-transform group-hover:scale-105"
      >
        <Play className="ml-0.5 size-6 fill-current" />
      </span>
      <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium tabular-nums text-white">
        {Math.floor(video.durationSeconds / 60)}:{String(video.durationSeconds % 60).padStart(2, "0")}
      </span>
    </button>
  );
}
