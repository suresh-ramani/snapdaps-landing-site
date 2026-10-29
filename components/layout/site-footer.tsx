import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { nav, site } from "@/content/site";

/** Footer — Tailark footer layout (MIT): brand column + link groups, hairline bottom bar. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const social = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="border-t bg-muted/30">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            AI photo sharing and face search for photographers and events. Upload once. Let AI do the rest.
          </p>
          <a href={`mailto:${site.contactEmail}`} className="mt-4 inline-block text-sm font-medium hover:text-primary">
            {site.contactEmail}
          </a>
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
      <div className="container-page flex flex-col gap-4 border-t py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        {social.length > 0 && (
          <ul className="flex gap-5">
            {social.map(([name, url]) => (
              <li key={name}>
                <a href={url} rel="me noopener" target="_blank" className="capitalize hover:text-foreground">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
