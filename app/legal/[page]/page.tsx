import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";

// TODO: replace with your real legal text (or fetch it from a WordPress page).
const pages: Record<string, { title: string; body: string }> = {
  privacy: { title: "Privacy policy", body: "Placeholder: add your privacy policy." },
  terms: { title: "Terms of service", body: "Placeholder: add your terms of service." },
};

type Props = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: Props) {
  const { page } = await params;
  const p = pages[page];
  return p ? buildMetadata({ title: p.title, path: `/legal/${page}` }) : {};
}

export default async function LegalPage({ params }: Props) {
  const { page } = await params;
  const p = pages[page];
  if (!p) notFound();
  return (
    <div className="container-page max-w-[var(--reading)] py-16 md:py-24">
      <h1 className="text-4xl font-bold">{p.title}</h1>
      <div className="prose prose-snap mt-8 dark:prose-invert">
        <p>{p.body}</p>
      </div>
    </div>
  );
}
