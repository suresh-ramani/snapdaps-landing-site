import { ogImage, ogSize } from "@/lib/og";

export const alt = "Upload photos, share by QR code or WhatsApp, guests upload a selfie and get their photos";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Photo Sharing App for Photographers with AI Face Search");
}
