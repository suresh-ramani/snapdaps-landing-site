import { Fragment } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { breadcrumbLd } from "@/lib/seo";

/** Visible breadcrumbs (shadcn Breadcrumb) + matching BreadcrumbList JSON-LD. The last item is the current page. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <Breadcrumb aria-label="Breadcrumb">
        <BreadcrumbList>
          {items.map((item, i) => (
            <Fragment key={item.path}>
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {i === items.length - 1 ? (
                  <BreadcrumbPage className="line-clamp-1">{item.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.path}>{item.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}
