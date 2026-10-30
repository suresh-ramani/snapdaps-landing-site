"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cta, nav, site, useCaseNav } from "@/content/site";
import { LogoFull } from "./logo";
import { navIcons } from "./nav-icons";

/**
 * The phone menu's sheet — loaded on demand by MobileNav (next/dynamic), so the Radix dialog code
 * isn't in every page's initial JavaScript.
 */
export function MobileNavSheet({
  open,
  onOpenChange,
  returnFocusTo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The menu button — focus goes back there on close. */
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
}) {
  const close = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        className="overflow-y-auto"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          returnFocusTo.current?.focus();
        }}
      >
        <SheetTitle>
          <LogoFull className="h-6" decorative />
          <span className="sr-only">{site.name} menu</span>
        </SheetTitle>
        {/* Calls to action first, so they're visible without scrolling the menu. */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button asChild>
            <a href={cta.trial.href}>{cta.trial.label}</a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact" onClick={close}>
              Book a demo
            </Link>
          </Button>
        </div>
        <nav aria-label="Mobile" className="mt-4 flex flex-col border-t">
          {nav.main.map((item) => (
            <Link key={item.href} href={item.href} onClick={close} className="border-b py-3.5 font-display text-lg">
              {item.label}
            </Link>
          ))}
          {useCaseNav.map((group) => (
            <div key={group.title} className="border-b py-4">
              <p className="text-xs font-medium text-muted-foreground">Use cases · {group.title.toLowerCase()}</p>
              <ul className="mt-2 grid grid-cols-2 gap-1">
                {group.links.map((l) => {
                  const Icon = l.icon ? navIcons[l.icon] : undefined;
                  return (
                    <li key={l.href}>
                      <Link href={l.href} onClick={close} className="flex items-center gap-2 rounded-md py-1.5 text-sm">
                        {Icon && <Icon className="size-4 text-primary" aria-hidden="true" />}
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
