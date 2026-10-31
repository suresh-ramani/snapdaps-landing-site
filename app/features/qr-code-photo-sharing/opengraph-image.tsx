import { ogImage, ogSize } from "@/lib/og";

export const alt = "Guests scan one event QR code and find their photos with a selfie";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("QR Code Photo Sharing for Events");
}
