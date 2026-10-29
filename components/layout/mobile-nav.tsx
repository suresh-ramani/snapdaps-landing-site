"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cta, nav, site, useCaseNav } from "@/content/site";
import { LogoFull } from "./logo";
import { navIcons } from "./nav-icons";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" aria-describedby={undefined} className="overflow-y-auto">
        <SheetTitle>
          <LogoFull className="h-6" decorative />
          <span className="sr-only">{site.name} menu</span>
        </SheetTitle>
        <nav aria-label="Mobile" className="mt-2 flex flex-col">
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
        <div className="mt-auto flex flex-col gap-3 pt-4">
          <Button asChild size="lg">
            <a href={cta.trial.href}>{cta.trial.label}</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact" onClick={close}>
              Book a demo
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
