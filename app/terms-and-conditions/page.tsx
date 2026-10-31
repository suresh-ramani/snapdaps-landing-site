import { LegalPage } from "@/components/legal/legal-page";
import { termsOfService as doc } from "@/content/legal/terms-and-conditions";
import { buildMetadata } from "@/lib/seo";

/* Legal text lives in content/legal/terms-and-conditions.ts — the company's own wording, not page copy. */

const PATH = "/terms-and-conditions";

export const metadata = buildMetadata({ title: doc.title, description: doc.description, path: PATH });

export default function Page() {
  return <LegalPage doc={doc} path={PATH} />;
}
