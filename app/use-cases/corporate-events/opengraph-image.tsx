import { ogImage, ogSize } from "@/lib/og";

export const alt = "Attendees upload a selfie and download their conference photos";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Corporate Event Photo Sharing with AI Face Search");
}
