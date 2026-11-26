import type { StaticImageData } from "next/image";
import manElder from "@/public/profiles/p-man-elder.webp";
import manUncle1 from "@/public/profiles/p-man-uncle-1.webp";
import manUncle2 from "@/public/profiles/p-man-uncle-2.webp";
import manYoung1 from "@/public/profiles/p-man-young-1.webp";
import manYoung2 from "@/public/profiles/p-man-young-2.webp";
import manYoung3 from "@/public/profiles/p-man-young-3.webp";
import womanAunty from "@/public/profiles/p-woman-aunty.webp";
import womanElder1 from "@/public/profiles/p-woman-elder-1.webp";
import womanElder2 from "@/public/profiles/p-woman-elder-2.webp";
import womanYoung1 from "@/public/profiles/p-woman-young-1.webp";
import womanYoung2 from "@/public/profiles/p-woman-young-2.webp";
import womanYoung3 from "@/public/profiles/p-woman-young-3.webp";

/**
 * Everyday profile pictures for `ProfilePic` — chat heads, avatar stacks, activity feeds: the people
 * who *message* or *wait*, as their WhatsApp photo would look, not dressed for a wedding. Free Unsplash
 * portraits, cropped 160×160 (sources in public/photos/CREDITS.md → "Profile pictures").
 * Also the guest's *selfie* in gallery windows and the try-it demo: a real selfie is taken anywhere, in
 * everyday clothes — not at the venue in wedding dress.
 */
export const profiles: StaticImageData[] = [
  womanYoung1, // 0
  manYoung1, // 1
  womanAunty, // 2
  manUncle1, // 3
  womanYoung2, // 4
  manYoung2, // 5
  womanElder2, // 6
  manYoung3, // 7
  womanYoung3, // 8
  manUncle2, // 9
  womanElder1, // 10
  manElder, // 11
];

/**
 * Every sample person a mock names, with the picture that fits (gender, age). Names are a typed union
 * (`PersonName`): chat senders, WhatsApp contacts, guest lists and demo guests must use one of these, so
 * a man's name can't end up with a woman's face — a new name fails the typecheck until it's added here.
 */
export const people = {
  Priya: { img: womanYoung1, gender: "female" },
  Ananya: { img: womanYoung2, gender: "female" },
  Riya: { img: womanYoung2, gender: "female" },
  Neha: { img: womanYoung3, gender: "female" },
  Meera: { img: womanYoung3, gender: "female" },
  Sunita: { img: womanAunty, gender: "female" },
  "Aunty ji": { img: womanElder1, gender: "female" },
  Dadi: { img: womanElder2, gender: "female" },
  Rahul: { img: manYoung3, gender: "male" },
  Kabir: { img: manYoung1, gender: "male" },
  Arjun: { img: manYoung2, gender: "male" },
  "Uncle ji": { img: manUncle1, gender: "male" },
  Dadaji: { img: manElder, gender: "male" },
} as const satisfies Record<string, { img: StaticImageData; gender: "female" | "male" }>;

export type PersonName = keyof typeof people;

/**
 * The one guest whose selfie the product visuals show (hero window, face-search bento tile, the
 * "Find your photos" and "photos found" cards) — the same face everywhere, so a selfie card and the
 * match card beside it never show two different people.
 */
export const GUEST_SELFIE_SEED = 4;

/** A named person's picture, or — for unnamed avatars (stacks, selfies) — one by `seed`. */
export function profileFor(person: PersonName | undefined, seed = 0): StaticImageData {
  return person ? people[person].img : profiles[seed % profiles.length];
}
