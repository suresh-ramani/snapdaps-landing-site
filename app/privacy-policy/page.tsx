import { LegalPage } from "@/components/legal/legal-page";
import { privacyPolicy as doc } from "@/content/legal/privacy-policy";
import { buildMetadata } from "@/lib/seo";

/* Legal text lives in content/legal/privacy-policy.ts — the company's own wording, not page copy. */

const PATH = "/privacy-policy";

export const metadata = buildMetadata({ title: doc.title, description: doc.description, path: PATH });

export default function Page() {
  return <LegalPage doc={doc} path={PATH} />;
}
