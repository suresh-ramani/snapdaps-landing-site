import { Lock, type LucideIcon } from "lucide-react";
import { FaceSearchVisual, FoldersVisual, PhoneVisual, UploadVisual } from "@/components/product/bento-visuals";
import { ShareOrbit } from "@/components/mock/share-orbit";
import { coreFeatures, type CoreFeatureKey } from "@/content/site";
import { BentoCard, BentoGrid } from "./bento-grid";

/**
 * Each feature's tile: its picture (or none → a statement tile with `Icon`), its spans, and its
 * section on /features. Tiles render in `order`, so the DOM order is the visual order:
 * lg — face search 2×2 hero, privacy statement and folders stacked beside it, then upload, share
 * and phone in a row; md — hero and statement full width, the rest in pairs; phones — one column.
 * Neighbours differ in kind: hero UI, statement, component, component, diagram, object.
 */
const order: CoreFeatureKey[] = ["face-search", "privacy", "gallery", "upload", "share", "mobile"];

const tile = "h-[19rem] lg:h-auto";

const meta: Record<CoreFeatureKey, { visual?: React.ReactNode; Icon?: LucideIcon; span: string; href: string }> = {
  "face-search": {
    visual: <FaceSearchVisual />,
    span: "h-[24rem] md:col-span-2 md:h-[26rem] lg:row-span-2 lg:h-auto",
    href: "/features#ai-face-search",
  },
  privacy: { Icon: Lock, span: "md:col-span-2 lg:col-span-1", href: "/features#privacy" },
  gallery: { visual: <FoldersVisual />, span: tile, href: "/features#smart-gallery" },
  upload: { visual: <UploadVisual />, span: tile, href: "/features#bulk-upload" },
  share: {
    visual: (
      <div className="flex h-full items-center justify-center [zoom:0.85]">
        <ShareOrbit />
      </div>
    ),
    span: tile,
    href: "/features#qr-sharing",
  },
  mobile: { visual: <PhoneVisual />, span: tile, href: "/features#mobile" },
};

type Item = { key: CoreFeatureKey; title: string; body: string };

/**
 * Feature bento (stageshow bento composition, see bento-grid.tsx).
 * Pass `items` to use page-specific copy; defaults to the shared core features.
 * `linked` turns each tile into a link to its section on /features.
 */
export function FeatureBento({
  items = coreFeatures as unknown as Item[],
  headingLevel = "h3",
  linked = true,
}: {
  items?: Item[];
  headingLevel?: "h2" | "h3";
  linked?: boolean;
}) {
  const sorted = [...items].sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
  return (
    <BentoGrid>
      {sorted.map((f) => {
        const m = meta[f.key];
        return (
          <BentoCard
            key={f.key}
            name={f.title}
            description={f.body}
            Icon={m.Icon}
            background={m.visual}
            href={linked ? m.href : undefined}
            className={m.span}
            headingLevel={headingLevel}
          />
        );
      })}
    </BentoGrid>
  );
}
