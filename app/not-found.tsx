import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-display text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-semibold">This page doesn&apos;t exist</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The link may be old or mistyped. Start from the home page or browse the blog.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Go to home page</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blogs">Browse the blog</Link>
        </Button>
      </div>
    </div>
  );
}
