"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

// The sheet (Radix dialog + links) loads on demand — touch/hover/focus starts it, ready by the tap.
const MobileNavSheet = dynamic(() => import("./mobile-nav-sheet").then((m) => m.MobileNavSheet), { ssr: false });

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const preload = () => setLoad(true);

  return (
    <>
      <Button
        ref={buttonRef}
        type="button"
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={preload}
        onPointerDown={preload}
        onFocus={preload}
        onClick={() => {
          setLoad(true);
          setOpen(true);
        }}
      >
        <Menu className="size-5" />
      </Button>
      {load && <MobileNavSheet open={open} onOpenChange={setOpen} returnFocusTo={buttonRef} />}
    </>
  );
}
