import type { StaticImageData } from "next/image";
import awardStage from "@/public/photos/award-stage.webp";
import birthdayBalloons from "@/public/photos/birthday-balloons.webp";
import birthdayConfetti from "@/public/photos/birthday-confetti.webp";
import corporateAudience from "@/public/photos/corporate-audience.webp";
import corporateConference from "@/public/photos/corporate-conference.webp";
import partyToast from "@/public/photos/party-toast.webp";
import sportsCricket from "@/public/photos/sports-cricket.webp";
import sportsCrowd from "@/public/photos/sports-crowd.webp";
import weddingAttire from "@/public/photos/wedding-attire.webp";
import weddingCanopy from "@/public/photos/wedding-canopy.webp";
import weddingCouple from "@/public/photos/wedding-couple.webp";
import weddingGuests from "@/public/photos/wedding-guests.webp";
import weddingHaldi from "@/public/photos/wedding-haldi.webp";
import weddingHenna from "@/public/photos/wedding-henna.webp";
import weddingReception from "@/public/photos/wedding-reception.webp";
import weddingRitual from "@/public/photos/wedding-ritual.webp";

/**
 * Real event photos for PhotoTile (product cards, galleries, event wall). All from Unsplash under
 * the Unsplash License (free for commercial use, no attribution required) — photographers and
 * source links in public/photos/CREDITS.md. Cropped 640×800 (4:5) WebP; next/image serves smaller
 * sizes. Event photos only: guest avatars stay illustrated (Face), so no stock model is shown as a
 * named sample guest. Static imports give next/image the real size (no layout shift) and a
 * fingerprinted, long-cached URL.
 */
export const photos = {
  "wedding-couple": weddingCouple,
  "wedding-guests": weddingGuests,
  "wedding-canopy": weddingCanopy,
  "wedding-haldi": weddingHaldi,
  "wedding-attire": weddingAttire,
  "wedding-ritual": weddingRitual,
  "wedding-henna": weddingHenna,
  "wedding-reception": weddingReception,
  "birthday-balloons": birthdayBalloons,
  "birthday-confetti": birthdayConfetti,
  "corporate-audience": corporateAudience,
  "corporate-conference": corporateConference,
  "party-toast": partyToast,
  "award-stage": awardStage,
  "sports-cricket": sportsCricket,
  "sports-crowd": sportsCrowd,
} satisfies Record<string, StaticImageData>;

export type PhotoName = keyof typeof photos;

/** Default pool for `seed`-based tiles: the product cards show a wedding, so wedding photos only. */
export const weddingPool: PhotoName[] = [
  "wedding-couple",
  "wedding-guests",
  "wedding-canopy",
  "wedding-haldi",
  "wedding-attire",
  "wedding-ritual",
  "wedding-henna",
  "wedding-reception",
];

/** Photos for each event type (event-type wall, use-cases page), keyed by use-case path. */
export const eventPhotos: Record<string, PhotoName[]> = {
  "/use-cases/wedding-photo-sharing-app": ["wedding-couple", "wedding-guests", "wedding-haldi", "wedding-canopy"],
  "/use-cases/birthday-party": ["birthday-balloons", "party-toast", "birthday-confetti", "wedding-guests"],
  "/use-cases/corporate-events": ["corporate-audience", "corporate-conference", "party-toast", "award-stage"],
  "/use-cases/award-ceremony": ["award-stage", "corporate-audience", "party-toast", "corporate-conference"],
  "/use-cases/sports-events": ["sports-cricket", "sports-crowd", "award-stage", "party-toast"],
  "/use-cases/photo-sharing-app-for-photographers": ["wedding-couple", "wedding-ritual", "wedding-henna", "corporate-audience"],
  "/use-cases/photo-sharing-app-for-event-planners": ["wedding-reception", "wedding-canopy", "corporate-conference", "birthday-balloons"],
};
