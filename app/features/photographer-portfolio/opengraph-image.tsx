import { ogImage, ogSize } from "@/lib/og";

export const alt = "A photographer's portfolio beside the event galleries they deliver";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Photographer Portfolio on Snapdaps");
}
