import { ogImage, ogSize } from "@/lib/og";

export const alt = "Event photos imported from Google Drive into a Snapdaps gallery";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Google Drive Import for Event Photos");
}
