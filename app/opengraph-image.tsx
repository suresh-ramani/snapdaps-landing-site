import { ogImage, ogSize } from "@/lib/og";

export const alt = "Snapdaps AI face search: upload a selfie, get your event photos instantly";
export const size = ogSize;
export const contentType = "image/png";

/** Default social card. Pages and blog posts can add their own opengraph-image.tsx. */
export default function OpengraphImage() {
  return ogImage("AI Photo Sharing and Face Search for Photographers & Events");
}
