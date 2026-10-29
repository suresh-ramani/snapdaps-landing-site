import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

/**
 * Draft preview entry point. Point WordPress's preview link at:
 *   https://snapdaps.ai/api/preview?secret=<PREVIEW_SECRET>&id=<post ID>
 * Exit with /api/preview?exit=1
 */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const draft = await draftMode();

  if (params.get("exit")) {
    draft.disable();
    redirect("/blogs");
  }

  if (!process.env.PREVIEW_SECRET || params.get("secret") !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid preview secret", { status: 401 });
  }
  const id = params.get("id");
  if (!id || !/^\d+$/.test(id)) {
    return new Response("Missing post id", { status: 400 });
  }

  draft.enable();
  redirect(`/blogs/preview/${id}`);
}
