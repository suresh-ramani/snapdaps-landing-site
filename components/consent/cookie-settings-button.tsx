"use client";

import { openCookieSettings } from "@/lib/consent";
import { cn } from "@/lib/utils";

/** Footer control that reopens the cookie settings panel (styled like the footer links). */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={cn("text-left text-sm text-muted-foreground transition-colors hover:text-foreground", className)}
    >
      Cookie settings
    </button>
  );
}
