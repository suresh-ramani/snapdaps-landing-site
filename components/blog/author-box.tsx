import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { WPAuthor } from "@/lib/wp/types";

/** Who wrote the post (E-E-A-T): avatar, name, WordPress bio and a link to their other posts. */
export function AuthorBox({ author }: { author: WPAuthor }) {
  return (
    <div className="surface flex flex-col gap-5 p-6 sm:flex-row">
      {author.avatar?.url && (
        <Image
          src={author.avatar.url}
          alt=""
          width={72}
          height={72}
          className="size-16 shrink-0 rounded-full ring-1 ring-border"
        />
      )}
      <div>
        <p className="text-sm text-muted-foreground">Written by</p>
        <p className="mt-0.5 text-lg font-semibold tracking-tight">{author.name}</p>
        {author.description && <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{author.description}</p>}
        <Link
          href={`/blogs/author/${author.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          More from {author.name} <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
