import { ogImage, ogSize } from "@/lib/og";

export const alt = "Wedding guests upload a selfie and find their wedding photos instantly";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Wedding Photo Sharing App with AI Face Search");
}
