/**
 * VIDEO TESTIMONIALS
 *
 * Only real Snapdaps customers, with their written consent to appear on the site. Never use
 * stock footage, actors, AI avatars, AI voices or scripted lines written for them — the badge
 * on these cards says "Not AI-generated", so it must be true.
 *
 * Two ways to add a video:
 *
 * A. YouTube (easiest) — paste the link as `youtube`. Any form works: youtube.com/watch?v=…,
 *    youtu.be/…, youtube.com/shorts/…, youtube.com/embed/…. Upload it as Public or Unlisted
 *    (not Private) and add captions in YouTube Studio — they're switched on by default here.
 *    The card shows YouTube's thumbnail (or your own `poster`) and only loads the YouTube
 *    player when someone presses play, via the privacy-enhanced youtube-nocookie.com embed.
 *    For a Short, set `aspect: "9/16"`.
 *
 * B. MP4 file — set `src` to a path under /public/testimonials/ or a full https URL (H.264,
 *    ~720p, under ~15 MB; plays everywhere). Optionally add an `av1` version (smaller; used
 *    when the device can decode it) and a `poster` frame. MP4s autoplay muted and looped while
 *    the card is on screen (not under reduced motion), with controls to unmute. Captions
 *    (WebVTT, .vtt) are required for real customer videos: they autoplay without sound, and
 *    deaf and hard-of-hearing visitors need them.
 *
 * Then: `quote` is a short line the customer actually says in the video. Set `verified` only
 * after the team has confirmed all three: the person is a real paying customer, they recorded
 * it themselves (or with us), and the clip is unedited apart from trimming — no AI-generated or
 * AI-altered face, voice or words. Keep the consent and the check on file. Unverified videos
 * still show, just without the badge.
 *
 * While this list is empty the section is hidden on the live site
 * (in `npm run dev` you'll see placeholder slots showing where videos go).
 */

type VideoBase = {
  /** Customer's name, as they agreed to be shown. */
  name: string;
  /** Role and business, e.g. "Wedding photographer, Studio Name". */
  role: string;
  city?: string;
  /** A short line they say in the video. Shown on the card and used as the schema description. */
  quote: string;
  /** Poster/video aspect ratio, width / height. Shorts are 9/16. */
  aspect?: "16/9" | "4/5" | "9/16";
  durationSeconds: number;
  /** When it was recorded, YYYY-MM-DD. */
  recordedOn: string;
  /** Set only when the check above has been done. */
  verified?: { on: string };
  /** Layout preview only: shown in `npm run dev`, never on the live site, no schema. */
  placeholder?: boolean;
};

export type YouTubeVideo = VideoBase & {
  /** A YouTube link: watch, youtu.be, shorts or embed URL. */
  youtube: string;
  /** Optional own thumbnail under /public; defaults to YouTube's. */
  poster?: string;
  src?: never;
};

export type SelfHostedVideo = VideoBase & {
  /** H.264 MP4: a path under /public or a full https URL. The fallback every device can play. */
  src: string;
  /** Optional AV1 MP4 — smaller; browsers that can decode AV1 pick it first. */
  av1?: string;
  /** Optional WebM version. */
  webm?: string;
  /** Optional first-frame image (shown before the video loads, and under reduced motion). */
  poster?: string;
  /** WebVTT captions — required for real customer videos (they autoplay muted). */
  captions?: string;
  /** Language of the captions file. Defaults to English. */
  captionsLang?: "en" | "hi";
  youtube?: never;
};

export type VideoTestimonial = YouTubeVideo | SelfHostedVideo;

export const videoTestimonials: VideoTestimonial[] = [
  // PLACEHOLDERS — layout preview in `npm run dev` only (filtered out of production builds).
  // Video: "Big Buck Bunny" by the Blender Foundation (CC BY 3.0), 10-second test clips from
  // test-videos.co.uk. Replace with real customer videos, then delete these three.
  {
    placeholder: true,
    name: "Placeholder name",
    role: "Placeholder: wedding photographer, studio name",
    city: "Jaipur",
    quote: "Placeholder: a short line the customer says in their video.",
    av1: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    aspect: "16/9",
    durationSeconds: 10,
    recordedOn: "2026-10-30",
    verified: { on: "2026-10-30" },
  },
  {
    placeholder: true,
    name: "Placeholder name",
    role: "Placeholder: event planner, company name",
    city: "Mumbai",
    quote: "Placeholder: a short line the customer says in their video.",
    av1: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    aspect: "16/9",
    durationSeconds: 10,
    recordedOn: "2026-10-30",
  },
  {
    placeholder: true,
    name: "Placeholder name",
    role: "Placeholder: corporate events photographer",
    city: "Bengaluru",
    quote: "Placeholder: a short line the customer says in their video.",
    av1: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    aspect: "16/9",
    durationSeconds: 10,
    recordedOn: "2026-10-30",
  },

  // Add real customer videos only. Example shapes:
  // {
  //   name: "…",
  //   role: "Wedding photographer, …",
  //   city: "Jaipur",
  //   quote: "…",
  //   youtube: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  //   aspect: "16/9",
  //   durationSeconds: 48,
  //   recordedOn: "2026-11-02",
  //   verified: { on: "2026-11-05" },
  // },
  // {
  //   name: "…",
  //   role: "Event planner, …",
  //   quote: "…",
  //   src: "/testimonials/name.mp4",
  //   poster: "/testimonials/name.jpg",
  //   captions: "/testimonials/name.en.vtt",
  //   aspect: "4/5",
  //   durationSeconds: 52,
  //   recordedOn: "2026-11-03",
  // },
];

export const videoTestimonialsHeading = "Hear it from photographers using Snapdaps";

/** What the badge means — shown next to the videos so the claim is explained, not just asserted. */
export const verifiedNote =
  "Verified: a real Snapdaps customer, recorded by them, and unedited apart from trimming — no AI-generated or AI-altered face, voice or words.";

/**
 * The 11-character video id from any common YouTube URL, or null if it isn't one.
 * Handles watch?v=, youtu.be/, /shorts/, /embed/, /live/ and m. / music. hosts.
 */
export function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^(www|m|music)\./, "");
    let id: string | null = null;
    if (host === "youtu.be") id = u.pathname.slice(1).split("/")[0];
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      id = u.searchParams.get("v") ?? u.pathname.match(/^\/(?:shorts|embed|live|v)\/([^/?#]+)/)?.[1] ?? null;
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

/** Poster image for a testimonial: the own poster, else YouTube's high-quality thumbnail. */
export function videoPoster(v: VideoTestimonial): string {
  if (v.poster) return v.poster;
  const id = v.youtube ? youtubeId(v.youtube) : null;
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
}

/** Stable key / identifier for a testimonial. */
export const videoKey = (v: VideoTestimonial) => `${v.youtube ?? v.src}#${v.name}#${v.role}`;
