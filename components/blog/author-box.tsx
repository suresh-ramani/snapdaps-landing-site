import Image from "next/image";
import Link from "next/link";
import type { WPAuthor } from "@/lib/wp/types";

export function AuthorBox({ author }: { author: WPAuthor }) {
  return (
    <div className="flex gap-5 rounded-xl border bg-card p-6">
      {author.avatar?.url && (
        <Image src={author.avatar.url} alt="" width={64} height={64} className="size-16 shrink-0 rounded-full" />
      )}
      <div>
        <p className="text-sm text-muted-foreground">Written by</p>
        <Link href={`/blogs/author/${author.slug}`} className="font-display text-lg font-semibold hover:text-primary">
          {author.name}
        </Link>
        {author.description && <p className="mt-2 text-[15px] text-muted-foreground">{author.description}</p>}
      </div>
    </div>
  );
}
