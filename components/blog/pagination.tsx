import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PageInfo } from "@/lib/wp/types";

/**
 * Cursor pagination with real, crawlable URLs (?after= / ?before=).
 * Crawlers follow these links; no infinite scroll.
 */
export function Pagination({ basePath, pageInfo }: { basePath: string; pageInfo: PageInfo }) {
  const { hasNextPage, hasPreviousPage, startCursor, endCursor } = pageInfo;
  if (!hasNextPage && !hasPreviousPage) return null;
  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-between border-t pt-8">
      {hasPreviousPage && startCursor ? (
        <Button asChild variant="outline">
          <Link href={`${basePath}?before=${encodeURIComponent(startCursor)}`} rel="prev">
            <ChevronLeft /> Newer posts
          </Link>
        </Button>
      ) : (
        <span />
      )}
      {hasNextPage && endCursor && (
        <Button asChild variant="outline">
          <Link href={`${basePath}?after=${encodeURIComponent(endCursor)}`} rel="next">
            Older posts <ChevronRight />
          </Link>
        </Button>
      )}
    </nav>
  );
}
