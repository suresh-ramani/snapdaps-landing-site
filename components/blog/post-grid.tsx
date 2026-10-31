import Link from "next/link";
import { FileText, SearchX, type LucideIcon } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import type { WPPostCard } from "@/lib/wp/types";

type EmptyState = {
  title: string;
  description: string;
  /** Where to go next, e.g. back to all posts. */
  action: { label: string; href: string };
  icon?: "posts" | "search";
};

const icons: Record<NonNullable<EmptyState["icon"]>, LucideIcon> = { posts: FileText, search: SearchX };

/** Post cards in a grid; with no posts, a shadcn/ui Empty state (MIT) that says why and offers a next step. */
export function PostGrid({
  posts,
  empty,
  headingLevel = "h3",
}: {
  posts: WPPostCard[];
  empty: EmptyState;
  headingLevel?: "h2" | "h3";
}) {
  if (!posts.length) {
    const Icon = icons[empty.icon ?? "posts"];
    return (
      <Empty className="border border-dashed bg-card">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>{empty.title}</EmptyTitle>
          <EmptyDescription>{empty.description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild variant="outline">
            <Link href={empty.action.href}>{empty.action.label}</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard post={post} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
