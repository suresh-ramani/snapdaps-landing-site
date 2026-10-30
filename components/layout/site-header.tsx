import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/demo/book-demo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/layout/logo";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cta } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container-page flex h-16 items-center gap-6">
        <Logo />
        <MainNav />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <BookDemoButton size="sm" variant="ghost" className="hidden md:inline-flex" />
          {/* Always visible: short label on phones/tablets, full label on desktop. */}
          <Button asChild size="sm">
            <a href={cta.trial.href}>
              <span className="lg:hidden">{cta.trialShort}</span>
              <span className="hidden lg:inline">{cta.trial.label}</span>
            </a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
