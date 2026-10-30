import { ogImage, ogSize } from "@/lib/og";

export const alt = "Snapdaps AI photo sharing for photographers, event planners and every kind of event";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("AI photo sharing for every event");
}
