import { ogImage, ogSize } from "@/lib/og";

export const alt = "A photography studio's own branded Snapdaps app on Android phones and iPhones";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Your Studio’s Own Photo App");
}
