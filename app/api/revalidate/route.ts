import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { WP_TAGS } from "@/lib/wp/client";

/**
 * WordPress → Next.js cache invalidation.
 *
 * Call from WordPress on save/delete (see README for the mu-plugin snippet):
 *   POST /api/revalidate
 *   Header: x-revalidate-secret: <REVALIDATE_SECRET>
 *   Body:   { "type": "post", "slug": "my-post" }   // or { "type": "all" }
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { type?: string; slug?: string };
  const tags: string[] = [WP_TAGS.posts];

  if (body.type === "post" && body.slug) tags.push(WP_TAGS.post(body.slug));
  if (body.type === "category" || body.type === "all") tags.push(WP_TAGS.categories);
  if (body.type === "user" || body.type === "all") tags.push(WP_TAGS.authors);

  // { expire: 0 } expires the cached data immediately, so the next SSR request refetches from WordPress.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ ok: true, revalidated: tags, now: Date.now() });
}
