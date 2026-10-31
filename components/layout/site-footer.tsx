import { Heart } from "lucide-react";
import Link from "next/link";
import { IndiaFlag } from "@/components/layout/india-flag";
import { Logo } from "@/components/layout/logo";
import { FacebookLogo, InstagramLogo } from "@/components/mock/brand-icons";
import { nav, site } from "@/content/site";

/** Footer — Tailark footer layout (MIT): brand column + link groups, hairline bottom bar. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const social = Object.entries(site.social).filter(([, url]) => url);
  const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    instagram: InstagramLogo,
    facebook: FacebookLogo,
  };
  return (
    <footer className="border-t bg-muted/30">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            AI photo sharing and face search for photographers and events. Upload once. Let AI do the rest.
          </p>
          <a href={`mailto:${site.contactEmail}`} className="mt-4 inline-block text-sm font-medium hover:text-primary">
            {site.contactEmail}
          </a>
          {social.length > 0 && (
            <ul className="mt-5 flex gap-2" aria-label="Snapdaps on social media">
              {social.map(([name, url]) => {
                const Icon = socialIcons[name];
                return (
                  <li key={name}>
                    <a
                      href={url}
                      rel="me noopener"
                      target="_blank"
                      aria-label={`Snapdaps on ${name.charAt(0).toUpperCase() + name.slice(1)} (opens in a new tab)`}
                      className="flex size-9 items-center justify-center rounded-full ring-1 ring-border transition-colors hover:bg-muted"
                    >
                      {Icon ? <Icon className="size-4" /> : <span className="text-xs capitalize">{name}</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {nav.footer.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-medium tracking-normal">{group.title}</h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Right padding keeps the bar clear of the WhatsApp bubble (FloatingActions). */}
      <div className="container-page flex flex-col gap-4 border-t py-6 text-sm text-muted-foreground pr-20 sm:flex-row sm:items-center sm:justify-between sm:pr-24">
        <p>
          © {year} {site.name}. A brand owned and operated by{" "}
          <a
            href={site.company.url}
            target="_blank"
            rel="noopener"
            className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            {site.company.name}
          </a>
        </p>
        <p className="flex items-center gap-1.5 font-medium text-foreground">
          <span>Made with</span>{" "}
          <Heart className="size-4 fill-heart text-heart" role="img" aria-label="love" />{" "}
          <span>in</span> <IndiaFlag label="India" />
        </p>
      </div>
    </footer>
  );
}
