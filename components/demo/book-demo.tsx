"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DemoForm } from "./demo-form";

/** "Book a demo" button that opens the demo form in a popup (content doc: Hero → Secondary CTA). */
export function BookDemoButton({
  label = "Book a demo",
  variant = "outline",
  size = "lg",
  className,
}: {
  label?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "inverse";
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent>
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
