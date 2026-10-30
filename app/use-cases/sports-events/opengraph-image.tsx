import { ogImage, ogSize } from "@/lib/og";

export const alt = "Players and parents upload a selfie and find their tournament photos";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Sports Tournament Photo Sharing with AI Face Search");
}
