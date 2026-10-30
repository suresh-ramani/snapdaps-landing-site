import { ogImage, ogSize } from "@/lib/og";

export const alt = "Party guests upload a selfie and get their birthday photos the same day";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Birthday Party Photo Sharing App with AI Face Search");
}
