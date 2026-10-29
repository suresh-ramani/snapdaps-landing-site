import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og-card";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

/** Use in a route's opengraph-image.tsx: `export default () => ogImage("Page title")`. */
export function ogImage(title: string, eyebrow: string = site.name) {
  return new ImageResponse(<OgCard eyebrow={eyebrow} title={title} />, ogSize);
}
