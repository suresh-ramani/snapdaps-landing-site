import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Article } from "@/components/blog/article";
import { getPostPreview } from "@/lib/wp/api";

export const metadata = { robots: { index: false, follow: false } };

type Props = { params: Promise<{ id: string }> };

export default async function PreviewPage({ params }: Props) {
  const { isEnabled } = await draftMode();
  if (!isEnabled) notFound();
  const { id } = await params;
  const post = await getPostPreview(id);
  if (!post) notFound();
  return <Article post={post} isPreview />;
}
