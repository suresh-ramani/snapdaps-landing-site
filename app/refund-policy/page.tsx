import { LegalPage } from "@/components/legal/legal-page";
import { refundPolicy as doc } from "@/content/legal/refund-policy";
import { buildMetadata } from "@/lib/seo";

/* Legal text lives in content/legal/refund-policy.ts — the company's own wording, not page copy. */

const PATH = "/refund-policy";

export const metadata = buildMetadata({ title: doc.title, description: doc.description, path: PATH });

export default function Page() {
  return <LegalPage doc={doc} path={PATH} />;
}
