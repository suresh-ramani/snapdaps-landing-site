import { PostCard } from "@/components/blog/post-card";
import type { WPPostCard } from "@/lib/wp/types";

export function PostGrid({ posts, emptyText }: { posts: WPPostCard[]; emptyText: string }) {
  if (!posts.length) {
    return <p className="rounded-xl border border-dashed p-10 text-muted-foreground">{emptyText}</p>;
  }
  return (
    <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
