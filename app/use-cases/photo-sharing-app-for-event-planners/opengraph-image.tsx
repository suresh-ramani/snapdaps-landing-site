import { ogImage, ogSize } from "@/lib/og";

export const alt = "Guests scan a QR code, upload a selfie and get their event photos instantly";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Event Photo Sharing Platform with AI Face Search");
}
