import { Images, Lock, QrCode, ScanFace, Smartphone, UploadCloud, type LucideIcon } from "lucide-react";
import {
  FaceMatchCard,
  GalleryCard,
  GuestActivityCard,
  PrivacyCard,
  UploadCard,
} from "@/components/product/cards";
import { ShareOrbit } from "@/components/mock/share-orbit";
import { coreFeatures, type CoreFeatureKey } from "@/content/site";
import { BentoCard, BentoGrid } from "./bento-grid";

/** Which product card illustrates each feature, its icon, and its span in the 3-column grid. */
const meta: Record<CoreFeatureKey, { Icon: LucideIcon; visual: React.ReactNode; span: string; href: string }> = {
  "face-search": {
    Icon: ScanFace,
    visual: <FaceMatchCard className="mx-auto max-w-sm" />,
    span: "md:col-span-2",
    href: "/features#ai-face-search",
  },
  gallery: {
    Icon: Images,
    visual: <GalleryCard />,
    span: "md:col-span-1",
    href: "/features#smart-gallery",
  },
  upload: {
    Icon: UploadCloud,
    visual: <UploadCard />,
    span: "md:col-span-1",
    href: "/features#bulk-upload",
  },
  share: {
    Icon: QrCode,
    visual: <ShareOrbit />,
    span: "md:col-span-1",
    href: "/features#qr-sharing",
  },
  mobile: {
    Icon: Smartphone,
    visual: <GuestActivityCard />,
    span: "md:col-span-1",
    href: "/features#mobile",
  },
  privacy: {
    Icon: Lock,
    visual: <PrivacyCard className="mx-auto max-w-md" />,
    span: "md:col-span-3",
    href: "/features#privacy",
  },
};

type Item = { key: CoreFeatureKey; title: string; body: string };

/**
 * Feature bento (Magic UI BentoGrid + Snapdaps product cards).
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
  return (
    <BentoGrid>
      {items.map((f) => {
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
