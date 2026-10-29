import Image from "next/image";
import Link from "next/link";
import { cn, formatDate, stripHtml } from "@/lib/utils";
import type { WPPostCard } from "@/lib/wp/types";

export function PostCard({
  post,
  featured = false,
  priority = false,
}: {
  post: WPPostCard;
  featured?: boolean;
  priority?: boolean;
}) {
  const img = post.featuredImage?.node;
  const category = post.categories?.nodes[0];
  const title = stripHtml(post.title);
  return (
    <article className={cn("group relative flex flex-col", featured && "md:grid md:grid-cols-[1.25fr_1fr] md:gap-10")}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border bg-muted">
        {img?.sourceUrl ? (
          <Image
            src={img.sourceUrl}
            alt={img.altText || ""}
            fill
            priority={priority}
            sizes={featured ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 bg-accent" />
        )}
      </div>
      <div className={cn("mt-5 flex flex-col", featured && "md:mt-0 md:justify-center")}>
        {category && (
          <Link
            href={`/blogs/category/${category.slug}`}
            className="relative z-10 self-start text-sm font-medium text-primary hover:underline"
          >
            {category.name}
          </Link>
        )}
        <h3 className={cn("mt-2 font-semibold leading-snug", featured ? "text-3xl md:text-4xl" : "text-xl")}>
          <Link href={`/blogs/${post.slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className={cn("mt-3 line-clamp-3 text-muted-foreground", featured ? "text-lg" : "text-[15px]")}>
          {stripHtml(post.excerpt)}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {post.author?.node.name && <span>{post.author.node.name}, </span>}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </div>
    </article>
  );
}
