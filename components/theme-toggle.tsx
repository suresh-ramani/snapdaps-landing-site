"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

/**
 * Light/dark toggle. The site follows the system setting by default (ThemeProvider
 * defaultTheme="system"). A click flips to the other theme; if that's the theme the system
 * already uses, the choice goes back to "system" instead of being saved, so the site keeps
 * following the device (e.g. a phone's automatic dark mode at night) rather than locking in.
 */
export function ThemeToggle() {
  const { resolvedTheme, systemTheme, setTheme } = useTheme();
  // The label is fixed so server and client HTML match (the theme is unknown on the server).
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={() => {
        const next = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(next === systemTheme ? "system" : next);
      }}
    >
      <Sun className="size-[18px] dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-[18px] dark:block" aria-hidden="true" />
    </Button>
  );
}
