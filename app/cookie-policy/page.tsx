import { LegalPage } from "@/components/legal/legal-page";
import { cookiePolicy as doc } from "@/content/legal/cookie-policy";
import { buildMetadata } from "@/lib/seo";

/* Legal text lives in content/legal/cookie-policy.ts — the company's own wording, not page copy. */

const PATH = "/cookie-policy";

export const metadata = buildMetadata({ title: doc.title, description: doc.description, path: PATH });

export default function Page() {
  return <LegalPage doc={doc} path={PATH} />;
}
