import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { AuthorBox } from "@/components/blog/author-box";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostCard } from "@/components/blog/post-card";
import { Toc } from "@/components/blog/toc";
import { JsonLd } from "@/components/json-ld";
import { cta, site } from "@/content/site";
import { blogPostingLd } from "@/lib/seo";
import { formatDate, readingTime, stripHtml } from "@/lib/utils";
import { getRelatedPosts } from "@/lib/wp/api";
import { prepareContent } from "@/lib/wp/content";
import type { WPPost } from "@/lib/wp/types";

/** Full article layout, shared by the live post route and draft previews. */
export function Article({ post, isPreview = false }: { post: WPPost; isPreview?: boolean }) {
  const { html, toc } = prepareContent(post.content ?? "");
  const title = stripHtml(post.title);
  const category = post.categories?.nodes[0];
  const author = post.author?.node;
  const img = post.featuredImage?.node;
  const updated = post.modified.slice(0, 10) !== post.date.slice(0, 10);

  return (
    <article className="pb-[var(--section-y)]">
      <header className="container-page pt-10 md:pt-14">
        <Breadcrumbs
          items={[
            { name: "Blog", path: "/blogs" },
            ...(category ? [{ name: category.name, path: `/blogs/category/${category.slug}` }] : []),
            { name: title, path: `/blogs/${post.slug}` },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] md:text-[3.4rem]">{title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">{stripHtml(post.excerpt)}</p>
          <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {author && (
              <Link href={`/blogs/author/${author.slug}`} className="font-medium text-foreground hover:text-primary">
                {author.name}
              </Link>
            )}
            <span>
              Published <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            {updated && (
              <span>
                Updated <time dateTime={post.modified}>{formatDate(post.modified)}</time>
              </span>
            )}
            <span>{readingTime(post.content ?? "")} min read</span>
          </p>
        </div>
        {img?.sourceUrl && (
          <div className="relative mt-10 aspect-[2/1] overflow-hidden rounded-xl border bg-muted">
            <Image
              src={img.sourceUrl}
              alt={img.altText || ""}
              fill
              priority
              sizes="(min-width: 1216px) 1152px, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </header>

      <div className="container-page mt-12 grid gap-12 lg:grid-cols-[minmax(0,var(--reading))_1fr] lg:gap-20">
        <div className="min-w-0">
          <div
            className="prose prose-lg prose-snap max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {post.tags?.nodes.length ? (
            <ul className="mt-10 flex flex-wrap gap-2">
              {post.tags.nodes.map((t) => (
                <li key={t.slug} className="rounded-full border px-3 py-1 text-sm text-muted-foreground">
                  {t.name}
                </li>
              ))}
            </ul>
          ) : null}

          <aside className="mt-12 rounded-xl bg-accent p-8">
            <p className="font-display text-2xl font-semibold text-accent-foreground">Try it in {site.name}</p>
            <p className="mt-2 text-muted-foreground">Upload event photos once. Guests find theirs with a selfie, using AI face search.</p>
            <Button asChild className="mt-6">
              <a href={cta.trial.href}>{cta.trial.label}</a>
            </Button>
          </aside>

          {author && (
            <div className="mt-12">
              <AuthorBox author={author} />
            </div>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Toc items={toc} />
          </div>
        </aside>
      </div>

      {!isPreview && (
        <Suspense fallback={null}>
          <RelatedPosts post={post} />
        </Suspense>
      )}

      {!isPreview && <JsonLd data={blogPostingLd(post)} />}
    </article>
  );
}

async function RelatedPosts({ post }: { post: WPPost }) {
  const related = await getRelatedPosts(post).catch(() => []);
  if (!related.length) return null;
  return (
    <section aria-labelledby="related-title" className="container-page mt-24 border-t pt-14">
      <h2 id="related-title" className="text-2xl font-semibold">
        Keep reading
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {related.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
