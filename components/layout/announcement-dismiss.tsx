"use client";

import { X } from "lucide-react";
import { ANNOUNCEMENT_KEY } from "./announcement-key";

/** Closes the announcement bar and remembers this announcement (by id) in this browser. */
export function AnnouncementDismiss({ id }: { id: string }) {
  return (
    <button
      type="button"
      aria-label="Dismiss announcement"
      onClick={() => {
        try {
          localStorage.setItem(ANNOUNCEMENT_KEY, id);
        } catch {
          /* storage blocked: it just hides for this page view */
        }
        const bar = document.getElementById("announcement");
        if (bar) bar.hidden = true;
      }}
      className="flex size-7 shrink-0 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100"
    >
      <X className="size-4" aria-hidden="true" />
    </button>
  );
}
