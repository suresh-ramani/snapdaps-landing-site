import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination as PaginationRoot, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import type { PageInfo } from "@/lib/wp/types";

/**
 * Cursor pagination with real, crawlable URLs (?after= / ?before=), on shadcn Pagination.
 * Crawlers follow these links; no infinite scroll.
 */
export function Pagination({ basePath, pageInfo }: { basePath: string; pageInfo: PageInfo }) {
  const { hasNextPage, hasPreviousPage, startCursor, endCursor } = pageInfo;
  if (!hasNextPage && !hasPreviousPage) return null;
  return (
    <PaginationRoot aria-label="Pagination" className="mt-16 border-t pt-8">
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          {hasPreviousPage && startCursor && (
            <PaginationLink
              href={`${basePath}?before=${encodeURIComponent(startCursor)}`}
              rel="prev"
              size="default"
              variant="outline"
            >
              <ChevronLeft data-icon="inline-start" />
              Newer posts
            </PaginationLink>
          )}
        </PaginationItem>
        <PaginationItem>
          {hasNextPage && endCursor && (
            <PaginationLink
              href={`${basePath}?after=${encodeURIComponent(endCursor)}`}
              rel="next"
              size="default"
              variant="outline"
            >
              Older posts
              <ChevronRight data-icon="inline-end" />
            </PaginationLink>
          )}
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
