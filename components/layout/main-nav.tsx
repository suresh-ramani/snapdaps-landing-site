"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { nav, useCaseNav } from "@/content/site";
import { cn } from "@/lib/utils";
import { navIcons } from "./nav-icons";

const linkClass =
  "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:font-medium";

export function MainNav() {
  const pathname = usePathname();
  const [howItWorks, ...rest] = nav.main;
  const current = (href: string) => (pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined);

  return (
    <NavigationMenu aria-label="Main" className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={howItWorks.href} className={linkClass} aria-current={current(howItWorks.href)}>
              {howItWorks.label}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(pathname.startsWith("/use-cases") && "text-foreground")}>
            Use cases
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[40rem] grid-cols-[1.1fr_1fr] gap-2 p-3">
              {useCaseNav.map((group) => (
                <div key={group.title} className="rounded-lg p-2">
                  <p className="px-2 pb-2 text-xs font-medium text-muted-foreground">{group.title}</p>
                  <ul className="space-y-0.5">
                    {group.links.map((l) => {
                      const Icon = l.icon ? navIcons[l.icon] : undefined;
                      return (
                        <li key={l.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={l.href}
                              className="flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted focus-visible:bg-muted"
                            >
                              {Icon && (
                                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                                  <Icon className="size-4" aria-hidden="true" />
                                </span>
                              )}
                              <span>
                                <span className="block text-sm font-medium">{l.label}</span>
                                {l.description && (
                                  <span className="block text-xs text-muted-foreground">{l.description}</span>
                                )}
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <NavigationMenuLink asChild>
                <Link
                  href="/use-cases"
                  className="col-span-2 rounded-lg bg-panel px-4 py-3 text-sm font-medium hover:text-primary"
                >
                  See all use cases
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {rest.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <Link href={item.href} className={linkClass} aria-current={current(item.href)}>
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
