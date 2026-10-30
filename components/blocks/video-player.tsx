"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { videoPoster, youtubeId, type VideoTestimonial } from "@/content/video-testimonials";

/**
 * Click-to-play facade: until someone presses play, the page only loads the poster image — no
 * video bytes and no YouTube scripts or cookies. Then the real player takes its place, starts,
 * and keyboard focus moves to it (the play button it replaced is gone):
 * - YouTube: the privacy-enhanced youtube-nocookie.com embed, captions on by default.
 * - Self-hosted: a native <video> with controls and the required captions track.
 */
export function VideoPlayer({ video }: { video: VideoTestimonial }) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement & HTMLVideoElement>(null);
  const label = `${video.name}, ${video.role}`;
  const poster = videoPoster(video);
  const ytId = video.youtube ? youtubeId(video.youtube) : null;

  useEffect(() => {
    if (playing) playerRef.current?.focus();
  }, [playing]);

  if (playing && ytId) {
    const params = new URLSearchParams({ autoplay: "1", rel: "0", playsinline: "1", cc_load_policy: "1", modestbranding: "1" });
    return (
      <iframe
        ref={playerRef}
        src={`https://www.youtube-nocookie.com/embed/${ytId}?${params}`}
        title={`Video testimonial: ${label}`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 size-full bg-black"
      />
    );
  }

  if (playing && video.src !== undefined) {
    return (
      <video
        ref={playerRef}
        controls
        autoPlay
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={`Video testimonial: ${label}`}
        className="absolute inset-0 size-full bg-black object-cover"
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.src} type="video/mp4" />
        <track
          kind="captions"
          src={video.captions}
          srcLang={video.captionsLang ?? "en"}
          label={video.captionsLang === "hi" ? "हिन्दी" : "English"}
          default
        />
      </video>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video testimonial: ${label}`}
      className="group absolute inset-0 size-full outline-offset-[-4px]"
    >
      {poster && (
        <Image src={poster} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
      />
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
