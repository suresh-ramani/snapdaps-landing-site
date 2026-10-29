"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
      <h1 className="text-3xl font-semibold">This page couldn&apos;t load</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Content didn&apos;t arrive in time. Try again, or go back to the home page.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Go to home page</Link>
        </Button>
      </div>
    </div>
  );
}
