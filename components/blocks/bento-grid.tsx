import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Bento grid — adapted from Magic UI's BentoGrid (MIT, https://github.com/magicuidesign/magicui,
 * apps/www/registry/magicui/bento-grid.tsx).
 *
 * Changes from the original: Snapdaps tokens + Tailark-style hairline ring surface,
 * a real heading level prop, the whole card is one link (keyboard-focusable) instead
 * of a hover-only CTA, and the hover lift respects prefers-reduced-motion.
 */

export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <ul className={cn("grid w-full auto-rows-[24rem] grid-cols-1 gap-4 md:grid-cols-3", className)}>{children}</ul>
  );
}

export function BentoCard({
  name,
  description,
  Icon,
  background,
  href,
  cta = "Learn more",
  className,
  headingLevel: H = "h3",
}: {
  name: string;
  description: string;
  Icon: LucideIcon;
  /** Product visual. Positioned absolutely at the top and faded out toward the text. */
  background: React.ReactNode;
  href?: string;
  cta?: string;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <li
      className={cn(
        "surface group relative flex flex-col justify-end overflow-hidden",
        href && "focus-within:ring-2 focus-within:ring-ring",
        className,
      )}
    >
      {/* Visual */}
      <div className="absolute inset-x-0 top-0 h-[70%] overflow-hidden bg-muted/50 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]">
        <div className="absolute inset-x-6 top-6 origin-top transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none">
          {background}
        </div>
      </div>

      {/* Copy */}
      <div className="relative z-10 p-6">
        <div className="flex transform-gpu flex-col gap-1.5 transition-transform duration-300 lg:group-hover:-translate-y-7 motion-reduce:transition-none motion-reduce:lg:group-hover:translate-y-0">
          <span className="icon-tile" aria-hidden="true">
            <Icon className="size-5" />
          </span>
          <H className="mt-2 text-lg font-semibold">
            {href ? (
              <Link href={href} className="outline-none after:absolute after:inset-0">
                {name}
              </Link>
            ) : (
              name
            )}
          </H>
          <p className="max-w-lg text-[15px] text-muted-foreground">{description}</p>
        </div>
        {href && (
          <span className="pointer-events-none absolute bottom-6 left-6 hidden translate-y-6 items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex motion-reduce:transition-none">
            {cta} <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-foreground/[0.02]" />
    </li>
  );
}
