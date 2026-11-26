import type { StaticImageData } from "next/image";
import guest0 from "@/public/faces/guest-0.webp";
import guest1 from "@/public/faces/guest-1.webp";
import guest2 from "@/public/faces/guest-2.webp";
import guest3 from "@/public/faces/guest-3.webp";
import guest4 from "@/public/faces/guest-4.webp";
import guest5 from "@/public/faces/guest-5.webp";
import guest6 from "@/public/faces/guest-6.webp";
import guest7 from "@/public/faces/guest-7.webp";
import guest8 from "@/public/faces/guest-8.webp";

/**
 * Real faces for `Face` (selfies, avatars, chat heads), cropped 160×160 from the free Unsplash wedding
 * photos already on the site — sources in public/photos/CREDITS.md ("Faces"). `Face seed={n}` picks
 * `faces[n % 9]`. Index 2 is "the guest" most visuals show (the bride from `wedding-couple-red`, the
 * first photo in the home pool), so her selfie and her photo appear together.
 *
 * 0 bride, varmala · 1 groom, red-lehenga couple · 2 bride, red-lehenga couple · 3 friend in ivory
 * 4 groom in turban · 5 friend in maroon · 6 groom, varmala · 7 bride in red and gold · 8 friend in coral
 */
export const faces: StaticImageData[] = [guest0, guest1, guest2, guest3, guest4, guest5, guest6, guest7, guest8];
