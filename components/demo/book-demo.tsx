"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

// The popup (Radix dialog + form) loads on demand — hover/focus starts it, so it's ready by the click.
const DemoDialog = dynamic(() => import("./demo-dialog").then((m) => m.DemoDialog), { ssr: false });

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
  const [load, setLoad] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const preload = () => setLoad(true);

  return (
    <>
      <Button
        ref={buttonRef}
        type="button"
        variant={variant}
        size={size}
        className={className}
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={preload}
        onFocus={preload}
        onClick={() => {
          setLoad(true);
          setOpen(true);
        }}
      >
        {label}
      </Button>
      {load && <DemoDialog open={open} onOpenChange={setOpen} returnFocusTo={buttonRef} />}
    </>
  );
}
