import { ogImage, ogSize } from "@/lib/og";

export const alt = "A guest uploads a selfie and AI face search finds every event photo they appear in";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("AI Face Search for Event Photos");
}
