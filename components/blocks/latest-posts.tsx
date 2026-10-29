import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { getPosts } from "@/lib/wp/api";
import { Section } from "./section";

/** Streams in after the rest of the home page (wrapped in <Suspense> by the page). */
export async function LatestPosts() {
  const { posts } = await getPosts({ first: 3 }).catch(() => ({ posts: [] }));
  if (!posts.length) return null;
  return (
    <Section id="blog" title="From the blog" tone="card">
      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Link href="/blogs" className="mt-10 inline-block font-medium text-primary hover:underline">
        Read all posts
      </Link>
    </Section>
  );
}
