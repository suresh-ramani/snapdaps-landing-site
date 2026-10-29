import { Images, Lock, QrCode, ScanFace, Smartphone, UploadCloud, type LucideIcon } from "lucide-react";
import { coreFeatures, type CoreFeatureKey } from "@/content/site";

const icons: Record<CoreFeatureKey, LucideIcon> = {
  "face-search": ScanFace,
  gallery: Images,
  upload: UploadCloud,
  share: QrCode,
  mobile: Smartphone,
  privacy: Lock,
};

type Item = { key: CoreFeatureKey; title: string; body: string };

/**
 * Compact 6-feature grid (Tailark features "soft card" style, MIT). Lighter than the
 * bento — use it lower on a page as a recap. Cells share hairline dividers (gap-px on a border-coloured grid).
 */
export function OfferGrid({ items = coreFeatures as unknown as Item[] }: { items?: Item[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => {
        const Icon = icons[f.key];
        return (
          <li key={f.key} className="bg-card p-7">
            <span className="icon-tile" aria-hidden="true">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-muted-foreground">{f.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
