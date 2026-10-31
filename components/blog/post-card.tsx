import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, formatDate, stripHtml, wpDate } from "@/lib/utils";
import type { WPPostCard } from "@/lib/wp/types";

/**
 * A post as a card, in the site's card style (`surface`, inner image with `rounded-lg`). The whole
 * card is one link (stretched title link); the category stays its own link above it.
 * `featured` lays it out wide for the newest post on the blog index.
 */
export function PostCard({
  post,
  featured = false,
  priority = false,
  headingLevel = "h3",
}: {
  post: WPPostCard;
  featured?: boolean;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const img = post.featuredImage?.node;
  const category = post.categories?.nodes[0];
  const author = post.author?.node;
  const title = stripHtml(post.title);
  const H = headingLevel;

  return (
    <article
      className={cn(
        "surface group relative flex h-full flex-col p-2 transition-shadow hover:shadow-md",
        featured && "md:grid md:grid-cols-[1.2fr_1fr] md:items-center md:gap-4",
      )}
    >
      <div className={cn("relative overflow-hidden rounded-lg bg-muted", featured ? "aspect-[16/10] md:aspect-[4/3]" : "aspect-[16/10]")}>
        {img?.sourceUrl ? (
          <Image
            src={img.sourceUrl}
            alt={img.altText || ""}
            fill
            priority={priority}
            sizes={featured ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"}
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden="true" className="glow-brand absolute inset-0" />
        )}
      </div>

      <div className={cn("flex flex-1 flex-col px-3 pb-3 pt-4", featured && "md:px-6 md:py-6")}>
        {category && (
          <Link
            href={`/blogs/category/${category.slug}`}
            className="relative z-10 self-start rounded-full bg-muted/70 px-2.5 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition-colors hover:text-primary"
          >
            {category.name}
          </Link>
        )}
        <H
          className={cn(
            "mt-3 font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary",
            featured ? "text-2xl md:text-[2rem] md:leading-tight" : "text-lg",
          )}
        >
          <Link href={`/blogs/${post.slug}`} className="after:absolute after:inset-0 after:rounded-xl after:content-['']">
            {title}
          </Link>
        </H>
        <p className={cn("mt-2 text-muted-foreground", featured ? "line-clamp-3 md:text-lg" : "line-clamp-2 text-[15px]")}>
          {stripHtml(post.excerpt)}
        </p>
        <div className="mt-auto flex items-center gap-2.5 pt-5 text-sm text-muted-foreground">
          {author?.avatar?.url && (
            <Image src={author.avatar.url} alt="" width={28} height={28} className="size-7 rounded-full ring-1 ring-border" />
          )}
          {author?.name && <span className="font-medium text-foreground">{author.name}</span>}
          <span aria-hidden="true">·</span>
          <time dateTime={wpDate(post.dateGmt, post.date)}>{formatDate(post.date)}</time>
          {featured && (
            <ArrowUpRight className="ml-auto size-5 transition-colors group-hover:text-primary" aria-hidden="true" />
          )}
        </div>
      </div>
    </article>
  );
}
