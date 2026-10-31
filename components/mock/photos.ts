import type { StaticImageData } from "next/image";
import awardGala from "@/public/photos/award-gala.webp";
import awardRedCarpet from "@/public/photos/award-red-carpet.webp";
import awardStage from "@/public/photos/award-stage.webp";
import awardStatuettes from "@/public/photos/award-statuettes.webp";
import awardTrophies from "@/public/photos/award-trophies.webp";
import birthdayBalloons from "@/public/photos/birthday-balloons.webp";
import birthdayCake from "@/public/photos/birthday-cake.webp";
import birthdayCandles from "@/public/photos/birthday-candles.webp";
import birthdayConfetti from "@/public/photos/birthday-confetti.webp";
import birthdayCupcakes from "@/public/photos/birthday-cupcakes.webp";
import birthdayDecor from "@/public/photos/birthday-decor.webp";
import birthdayFamilyCake from "@/public/photos/birthday-family-cake.webp";
import corporateAudience from "@/public/photos/corporate-audience.webp";
import corporateConference from "@/public/photos/corporate-conference.webp";
import corporateNetworking from "@/public/photos/corporate-networking.webp";
import corporatePanel from "@/public/photos/corporate-panel.webp";
import corporatePhones from "@/public/photos/corporate-phones.webp";
import corporateSpeaker from "@/public/photos/corporate-speaker.webp";
import corporateTeam from "@/public/photos/corporate-team.webp";
import partyToast from "@/public/photos/party-toast.webp";
import photographerAtWork from "@/public/photos/photographer-at-work.webp";
import sportsBatsman from "@/public/photos/sports-batsman.webp";
import sportsCricket from "@/public/photos/sports-cricket.webp";
import sportsCrowd from "@/public/photos/sports-crowd.webp";
import sportsKidsFootball from "@/public/photos/sports-kids-football.webp";
import sportsMedalWinners from "@/public/photos/sports-medal-winners.webp";
import sportsMedals from "@/public/photos/sports-medals.webp";
import sportsTeamHuddle from "@/public/photos/sports-team-huddle.webp";
import venueBanquet from "@/public/photos/venue-banquet.webp";
import weddingAttire from "@/public/photos/wedding-attire.webp";
import weddingCanopy from "@/public/photos/wedding-canopy.webp";
import weddingCouple from "@/public/photos/wedding-couple.webp";
import weddingGuestPhone from "@/public/photos/wedding-guest-phone.webp";
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
  "photographer-at-work": photographerAtWork,
  "venue-banquet": venueBanquet,
  "wedding-guest-phone": weddingGuestPhone,
  "birthday-cake": birthdayCake,
  "corporate-phones": corporatePhones,
  "award-trophies": awardTrophies,
  "sports-batsman": sportsBatsman,
  "birthday-candles": birthdayCandles,
  "birthday-decor": birthdayDecor,
  "birthday-family-cake": birthdayFamilyCake,
  "birthday-cupcakes": birthdayCupcakes,
  "corporate-speaker": corporateSpeaker,
  "corporate-panel": corporatePanel,
  "corporate-networking": corporateNetworking,
  "corporate-team": corporateTeam,
  "award-gala": awardGala,
  "award-red-carpet": awardRedCarpet,
  "award-statuettes": awardStatuettes,
  "sports-kids-football": sportsKidsFootball,
  "sports-medal-winners": sportsMedalWinners,
  "sports-team-huddle": sportsTeamHuddle,
  "sports-medals": sportsMedals,
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
  "/use-cases/wedding-photo-sharing-app": ["wedding-couple", "wedding-guest-phone", "wedding-haldi", "wedding-canopy"],
  "/use-cases/birthday-party": ["birthday-cake", "birthday-balloons", "party-toast", "birthday-confetti"],
  "/use-cases/corporate-events": ["corporate-conference", "corporate-phones", "corporate-audience", "venue-banquet"],
  "/use-cases/award-ceremony": ["award-trophies", "award-stage", "corporate-audience", "party-toast"],
  "/use-cases/sports-events": ["sports-batsman", "sports-cricket", "sports-crowd", "award-trophies"],
  "/use-cases/photo-sharing-app-for-photographers": ["photographer-at-work", "wedding-couple", "wedding-ritual", "wedding-henna"],
  "/use-cases/photo-sharing-app-for-event-planners": ["venue-banquet", "wedding-reception", "corporate-conference", "birthday-balloons"],
};

/**
 * The sample event each use-case page's product cards show (bento, workflow, story) via
 * `<PhotoPool>`: a made-up event name, four folders and a photo pool of six or more, so a
 * gallery barely repeats. Event photos only. Sample data — the cards are aria-hidden + nosnippet.
 */
export const eventSamples: Record<
  string,
  { name: string; folders: [string, string, string, string]; pool: PhotoName[] }
> = {
  "/use-cases/wedding-photo-sharing-app": {
    name: "Riya & Arjun’s wedding",
    folders: ["Haldi", "Sangeet", "Wedding", "Reception"],
    pool: [...weddingPool, "wedding-guest-phone"],
  },
  "/use-cases/birthday-party": {
    name: "Aarav’s 6th birthday",
    folders: ["Decor", "Cake cutting", "Games", "Dance"],
    pool: [
    "birthday-cake",
    "birthday-candles",
    "birthday-balloons",
    "birthday-family-cake",
    "birthday-decor",
    "birthday-cupcakes",
    "birthday-confetti",
    "party-toast",
  ],
  },
  "/use-cases/corporate-events": {
    name: "Annual leadership summit",
    folders: ["Keynote", "Workshops", "Networking", "Team dinner"],
    pool: [
    "corporate-conference",
    "corporate-speaker",
    "corporate-panel",
    "corporate-networking",
    "corporate-team",
    "corporate-audience",
    "corporate-phones",
    "venue-banquet",
  ],
  },
  "/use-cases/award-ceremony": {
    name: "Excellence awards night",
    folders: ["Red carpet", "Awards", "Performances", "Gala dinner"],
    pool: [
    "award-stage",
    "award-trophies",
    "award-gala",
    "award-red-carpet",
    "award-statuettes",
    "corporate-audience",
    "party-toast",
  ],
  },
  "/use-cases/sports-events": {
    name: "Inter-school cricket cup",
    folders: ["Day 1", "Day 2", "Final", "Prize giving"],
    pool: [
    "sports-batsman",
    "sports-kids-football",
    "sports-cricket",
    "sports-team-huddle",
    "sports-medal-winners",
    "sports-crowd",
    "sports-medals",
  ],
  },
  "/use-cases/photo-sharing-app-for-photographers": {
    name: "Riya & Arjun’s wedding",
    folders: ["Haldi", "Sangeet", "Wedding", "Reception"],
    pool: [
    "wedding-couple",
    "photographer-at-work",
    "wedding-ritual",
    "corporate-speaker",
    "wedding-haldi",
    "birthday-candles",
    "award-stage",
    "wedding-henna",
  ],
  },
  "/use-cases/photo-sharing-app-for-event-planners": {
    name: "Annual gala evening",
    folders: ["Arrivals", "Stage", "Dinner", "Dance floor"],
    pool: [
    "venue-banquet",
    "wedding-reception",
    "corporate-panel",
    "birthday-decor",
    "wedding-canopy",
    "corporate-networking",
    "award-gala",
    "sports-team-huddle",
  ],
  },
};
