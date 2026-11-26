import type { StaticImageData } from "next/image";
import detectAward from "@/public/photos/detect-award.webp";
import detectBirthday from "@/public/photos/detect-birthday.webp";
import detectCorporate from "@/public/photos/detect-corporate.webp";
import detectPheras from "@/public/photos/detect-pheras.webp";
import detectPlanners from "@/public/photos/detect-planners.webp";
import detectSports from "@/public/photos/detect-sports.webp";

/** A face's box in % of its photo: left, top, width, height. */
export type FaceBox = { l: number; t: number; w: number; h: number };

/**
 * Group photos for the "AI detects faces" visuals (`DetectFacesCard`), one per kind of event, each a
 * 16:10 crop with every visible face **measured on the photo** (never guessed). If you recrop a photo,
 * measure its faces again. Sources in public/photos/CREDITS.md (detect-*.webp).
 */
export const detectScenes = {
  wedding: {
    img: detectPheras,
    faces: [
      { l: 4.9, t: 9.1, w: 5.3, h: 8.5 },
      { l: 21.2, t: 14.5, w: 4.5, h: 7.3 },
      { l: 49.2, t: 32.7, w: 4.5, h: 7.3 },
      { l: 68.9, t: 18.2, w: 4.5, h: 7.3 },
      { l: 73.5, t: 13.3, w: 4.5, h: 7.3 },
      { l: 86.7, t: 12.7, w: 5.3, h: 8.5 },
      { l: 89.0, t: 44.8, w: 5.3, h: 8.5 },
    ],
  },
  birthday: {
    img: detectBirthday,
    faces: [
      { l: 39.8, t: 18.8, w: 14.1, h: 22.5 },
      { l: 33.0, t: 70.3, w: 12.2, h: 19.5 },
      { l: 69.5, t: 51.3, w: 13.1, h: 21.0 },
    ],
  },
  corporate: {
    img: detectCorporate,
    faces: [
      { l: 8.8, t: 33.8, w: 5.3, h: 8.5 },
      { l: 25.9, t: 39.8, w: 5.3, h: 8.5 },
      { l: 44.2, t: 35.8, w: 5.3, h: 8.5 },
      { l: 52.3, t: 38.3, w: 4.7, h: 7.5 },
      { l: 58.3, t: 44.3, w: 4.7, h: 7.5 },
      { l: 71.9, t: 37.5, w: 5.6, h: 9.0 },
      { l: 93.9, t: 49.5, w: 5.3, h: 8.5 },
    ],
  },
  award: {
    img: detectAward,
    faces: [
      { l: 6.9, t: 36.5, w: 8.1, h: 13.0 },
      { l: 43.0, t: 36.8, w: 7.8, h: 12.5 },
      { l: 78.6, t: 34.3, w: 8.4, h: 13.5 },
    ],
  },
  sports: {
    img: detectSports,
    faces: [
      { l: 12.3, t: 14.0, w: 8.8, h: 14.0 },
      { l: 56.1, t: 26.3, w: 8.8, h: 14.0 },
      { l: 76.3, t: 40.5, w: 7.8, h: 12.5 },
      { l: 92.7, t: 25.8, w: 7.5, h: 12.0 },
    ],
  },
  planners: {
    img: detectPlanners,
    faces: [
      { l: 21.9, t: 27.3, w: 6.3, h: 10.0 },
      { l: 32.0, t: 37.8, w: 6.9, h: 11.0 },
      { l: 52.3, t: 47.3, w: 5.6, h: 9.0 },
      { l: 61.1, t: 41.8, w: 5.0, h: 8.0 },
    ],
  },
} satisfies Record<string, { img: StaticImageData; faces: FaceBox[] }>;

export type DetectScene = keyof typeof detectScenes;
