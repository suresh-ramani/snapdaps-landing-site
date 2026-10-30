"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DemoForm } from "./demo-form";

/**
 * The "Book a demo" popup itself — loaded on demand by BookDemoButton (next/dynamic), so the
 * Radix dialog and the form stay out of every page's initial JavaScript.
 */
export function DemoDialog({
  open,
  onOpenChange,
  returnFocusTo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The button that opened it — focus goes back there on close. */
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          returnFocusTo.current?.focus();
        }}
      >
        <div>
          <DialogTitle>Book a demo</DialogTitle>
          <DialogDescription className="mt-2">
            See how Snapdaps delivers event photos with AI face search. We&apos;ll get back to you within one working day.
          </DialogDescription>
        </div>
        <DemoForm source="popup" />
      </DialogContent>
    </Dialog>
  );
}
