import Image from "next/image";
import { clients as allClients, clientsHeading, type Client } from "@/content/clients";
import { cn } from "@/lib/utils";

/**
 * Client logos (layout after Tailark's logo-cloud blocks, MIT; marquee after Magic UI's Marquee).
 *
 * - `variant="row"`: label + a static wrapped row. Good under a hero.
 * - `variant="marquee"`: a slowly scrolling strip, used automatically when there are
 *   more logos than fit comfortably (8+). Speed stays the same as the list grows. Pauses on
 *   hover; wraps into a static grid under reduced motion. CSS only (transform), no JS.
 *
 * Data lives in content/clients.ts. Hidden in production while the list is empty.
 */
export function LogoCloud({
  variant,
  heading = clientsHeading,
  clients = allClients,
  className,
  embedded = false,
}: {
  variant?: "row" | "marquee";
  heading?: string;
  clients?: Client[];
  className?: string;
  /** Inside another section: renders a div with an h3 instead of its own section/h2. */
  embedded?: boolean;
}) {
  const isDev = process.env.NODE_ENV !== "production";
  if (!clients.length && !isDev) return null;

  const mode = variant ?? (clients.length >= 8 ? "marquee" : "row");
  const Wrapper = embedded ? "div" : "section";
  const H = embedded ? "h3" : "h2";
  const headingId = embedded ? "clients-embedded-title" : "clients-title";

  return (
    <Wrapper
      aria-labelledby={headingId}
      data-tone={embedded ? undefined : "default"}
      className={cn(!embedded && "section-y", className)}
    >
      <div className={cn(!embedded && "container-page")}>
        <H id={headingId} className="text-center text-sm font-medium tracking-normal text-muted-foreground">
          {heading}
        </H>

        {!clients.length ? (
          <Placeholder />
        ) : mode === "marquee" ? (
          <Marquee clients={clients} />
        ) : (
          <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {clients.map((c) => (
              <li key={c.name}>
                <ClientLogo client={c} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Wrapper>
  );
}

/** One client logo (also used by the client grid in SocialProof). */
export function ClientLogo({ client, className }: { client: Client; className?: string }) {
  const img = (
    <Image
      src={client.logo}
      alt={client.name}
      width={client.width}
      height={client.height}
      className={cn(
        "w-auto max-w-36 object-contain opacity-60 transition duration-300 hover:opacity-100 dark:invert",
        // Studio badges are square with fine detail; give them more height than wordmarks.
        client.mono ? "h-11" : "h-9",
        // Colour logos: greyscale until hover, then their real colours (un-inverted in dark mode).
        !client.mono && "grayscale hover:grayscale-0 dark:hover:invert-0",
        className,
      )}
    />
  );
  return client.href ? (
    <a href={client.href} target="_blank" rel="noopener noreferrer" className="block">
      {img}
    </a>
  ) : (
    img
  );
}

function Marquee({ clients }: { clients: Client[] }) {
  return (
    <div
      className="group relative mt-8 overflow-hidden [--marquee-gap:3rem] [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
      // Constant speed however many logos there are (~4s per logo per loop).
      style={{ "--marquee-duration": `${Math.max(24, clients.length * 4)}s` } as React.CSSProperties}
    >
      {/* Visible list (first copy) + a duplicate for a seamless loop, hidden from assistive tech. */}
      <div className="flex w-max gap-(--marquee-gap) motion-safe:animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        <ul className="flex shrink-0 items-center gap-(--marquee-gap)">
          {clients.map((c) => (
            <li key={c.name}>
              <ClientLogo client={c} />
            </li>
          ))}
        </ul>
        <ul aria-hidden="true" className="flex shrink-0 items-center gap-(--marquee-gap) motion-reduce:hidden">
          {clients.map((c) => (
            <li key={`dup-${c.name}`} inert>
              <ClientLogo client={c} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="mx-auto mt-8 max-w-4xl">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="flex h-14 items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground">
            Logo {i + 1}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Development only: add logos in content/clients.ts. This section is hidden on the live site until you do.
      </p>
    </div>
  );
}
