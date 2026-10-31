import { ogImage, ogSize } from "@/lib/og";

export const alt = "A photography studio's own branded Snapdaps app on Android and iOS";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("White-Label Mobile App for Photography Studios");
}
