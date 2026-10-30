import { ogImage, ogSize } from "@/lib/og";

export const alt = "Five steps from photo upload to every guest finding their photos with a selfie";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("How Snapdaps works");
}
