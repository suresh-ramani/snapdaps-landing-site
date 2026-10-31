import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ListTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthorBox } from "@/components/blog/author-box";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostCard } from "@/components/blog/post-card";
import { ShareLinks } from "@/components/blog/share-links";
import { Toc } from "@/components/blog/toc";
import { AnnouncementCard } from "@/components/layout/announcement-bar";
import { CtaBand } from "@/components/blocks/cta-band";
import { JsonLd } from "@/components/json-ld";
import { cta, site } from "@/content/site";
import { blogPostingLd, faqLd } from "@/lib/seo";
import { absoluteUrl, formatDate, readingTime, stripHtml, wpDate } from "@/lib/utils";
import { getRelatedPosts } from "@/lib/wp/api";
import { prepareContent } from "@/lib/wp/content";
import type { WPPost } from "@/lib/wp/types";

/**
 * Full article layout, shared by the live post route and draft previews.
 *
 * - Header band (brand glow): breadcrumbs, category, H1, excerpt, author avatar + name, dates,
 *   reading time — who wrote it and when, up front (E-E-A-T). Then the featured image.
 * - Body: reading-width prose; on desktop a sticky sidebar with "On this page", the current
 *   announcement card (offer / launch / update, when one is on) and a small product card; on phones the contents sit in a collapsible box above the text.
 * - After the text: tags, share, author box; then related posts (panel band) and the CTA band.
 */
export function Article({ post, isPreview = false }: { post: WPPost; isPreview?: boolean }) {
  const { html, toc, faq } = prepareContent(post.content ?? "");
  const title = stripHtml(post.title);
  const category = post.categories?.nodes[0];
  const author = post.author?.node;
  const img = post.featuredImage?.node;
  const updated = post.modified.slice(0, 10) !== post.date.slice(0, 10);
  const url = absoluteUrl(`/blogs/${post.slug}`);

  return (
    <article>
      <header data-tone="default" className="relative isolate overflow-hidden pb-12 pt-10 md:pb-16 md:pt-14">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem]" />
        <div className="container-page">
          <Breadcrumbs
            items={[
              { name: "Blog", path: "/blogs" },
              ...(category ? [{ name: category.name, path: `/blogs/category/${category.slug}` }] : []),
              { name: title, path: `/blogs/${post.slug}` },
            ]}
          />
          <div className="mx-auto mt-10 max-w-3xl text-center">
            {category && (
              <Link
                href={`/blogs/category/${category.slug}`}
                className="inline-flex rounded-full bg-card px-3 py-1 text-sm font-medium text-muted-foreground ring-1 ring-border transition-colors hover:text-primary"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight md:text-[3.4rem]">{title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {stripHtml(post.excerpt)}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              {author && (
                <Link
                  href={`/blogs/author/${author.slug}`}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary"
                >
                  {author.avatar?.url && (
                    <Image src={author.avatar.url} alt="" width={32} height={32} className="size-8 rounded-full ring-1 ring-border" />
                  )}
                  {author.name}
                </Link>
              )}
              <span aria-hidden="true">·</span>
              <span>
                <time dateTime={wpDate(post.dateGmt, post.date)}>{formatDate(post.date)}</time>
              </span>
              {updated && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={wpDate(post.modifiedGmt, post.modified)}>{formatDate(post.modified)}</time>
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{readingTime(post.content ?? "")} min read</span>
            </div>
          </div>
          {img?.sourceUrl && (
            <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-2xl bg-muted ring-1 ring-border md:aspect-[2/1]">
              <Image
                src={img.sourceUrl}
                alt={img.altText || title}
                fill
                priority
                sizes="(min-width: 1088px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </header>

      {/* Top gap comes from the header band's pb-* (same-tone neighbours drop their top padding). */}
      <section data-tone="default" aria-label="Article" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,var(--reading))_17rem] lg:justify-center lg:gap-16">
          <div className="min-w-0">
            {toc.length > 1 && (
              <details className="surface mb-10 px-5 py-4 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center gap-2 font-medium">
                  <ListTree className="size-4 text-muted-foreground" aria-hidden="true" /> On this page
                </summary>
                <ul className="mt-3 space-y-2 border-l text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`-ml-px block border-l border-transparent py-0.5 text-muted-foreground hover:text-foreground ${item.level === 3 ? "pl-7" : "pl-4"}`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div
              className="prose prose-lg prose-snap max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {post.tags?.nodes.length ? (
              <ul aria-label="Tags" className="mt-10 flex flex-wrap gap-2">
                {post.tags.nodes.map((t) => (
                  <li key={t.slug} className="rounded-full bg-muted/60 px-3 py-1 text-sm text-muted-foreground ring-1 ring-border">
                    #{t.name}
                  </li>
                ))}
              </ul>
            ) : null}

            <ShareLinks url={url} title={title} className="mt-8 border-y py-5" />

            {author && (
              <div className="mt-10">
                <AuthorBox author={author} />
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-6 overflow-y-auto px-1 pb-4">
              <Toc items={toc} />
              {/* Current offer / launch / update from WordPress → Settings → Announcement (none in previews). */}
              {!isPreview && (
                <Suspense fallback={null}>
                  <AnnouncementCard />
                </Suspense>
              )}
              <div className="surface p-5">
                <p className="font-semibold tracking-tight">Share event photos the smart way</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Upload once. Every guest finds their photos with a selfie on {site.name}.
                </p>
                <Button asChild size="sm" className="mt-4 w-full">
                  <a href={cta.trial.href}>{cta.trial.label}</a>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {!isPreview && (
        <Suspense fallback={null}>
          <RelatedPosts post={post} />
        </Suspense>
      )}

      <CtaBand title="Ready to share your next event’s photos?" body="Upload once. Let AI do the rest." />

      {!isPreview && <JsonLd data={blogPostingLd(post)} />}
      {/* FAQPage only when the post has a Yoast FAQ block — the schema mirrors visible questions. */}
      {!isPreview && faq.length > 0 && <JsonLd data={faqLd(faq)} />}
    </article>
  );
}

async function RelatedPosts({ post }: { post: WPPost }) {
  const related = await getRelatedPosts(post).catch(() => []);
  if (!related.length) return null;
  return (
    <section data-tone="panel" aria-labelledby="related-title" className="section-y bg-muted/50">
      <div className="container-page">
        <h2 id="related-title" className="text-3xl font-semibold tracking-tight">
          Keep reading
        </h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
