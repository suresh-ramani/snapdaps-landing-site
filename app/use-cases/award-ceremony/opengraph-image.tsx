import { ogImage, ogSize } from "@/lib/og";

export const alt = "Winners upload a selfie and find their stage photos";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Award Ceremony Photo Sharing with AI Face Search");
}
