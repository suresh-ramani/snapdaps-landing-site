import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Bento grid — started from Magic UI's BentoGrid (MIT, https://github.com/magicuidesign/magicui,
 * apps/www/registry/magicui/bento-grid.tsx), recomposed after the stageshow bento rules
 * (.claude/skills/stageshow/references/bento.md).
 *
 * Every tile shares one frame: `surface`, the picture on top on a muted ground (cropped by the
 * tile edge, never faded), the copy below it as page type — a title and one sentence. A tile
 * without a picture is a statement: an icon and the title in large type. The whole tile is one
 * link (keyboard-focusable); hover only nudges the arrow. Tiles rise in a stagger as the grid
 * scrolls into view (Reveal).
 *
 * Layout (spans come from the caller): one column on phones, two from md, three from lg with
 * 19rem rows, so a `lg:row-span-2` hero sits beside two stacked tiles.
 */

export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <RevealGroup
      as="ul"
      stagger={0.1}
      className={cn("grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:auto-rows-[19rem] lg:grid-cols-3", className)}
    >
      {children}
    </RevealGroup>
  );
}

export function BentoCard({
  name,
  description,
  Icon,
  background,
  href,
  className,
  headingLevel: H = "h3",
}: {
  name: string;
  description: string;
  /** Shown only on a statement tile (no `background`). */
  Icon?: LucideIcon;
  /** The tile's picture: one component or object, cropped by the tile edge. Omit for a statement tile. */
  background?: React.ReactNode;
  href?: string;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const statement = !background;
  const title = (
    <>
      {name}
      {href && (
        <ArrowRight
          aria-hidden="true"
          className="ml-1.5 inline size-4 align-[-0.1em] text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary motion-reduce:transition-none"
        />
      )}
    </>
  );
  return (
    <Reveal
      as="li"
      className={cn(
        "surface group relative flex flex-col overflow-hidden",
        href && "focus-within:ring-2 focus-within:ring-ring",
        className,
      )}
    >
      {statement ? (
        <div className="flex flex-1 flex-col justify-between gap-10 p-6 md:p-8">
          {Icon && (
            <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
              <Icon className="size-6" />
            </span>
          )}
          <div>
            <H className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.75rem]">
              {href ? (
                <Link href={href} className="outline-none after:absolute after:inset-0">
                  {title}
                </Link>
              ) : (
                title
              )}
            </H>
            <p className="mt-3 max-w-md text-[15px] text-muted-foreground">{description}</p>
          </div>
        </div>
      ) : (
        <>
          <div
            aria-hidden="true"
            data-nosnippet
            inert
            className="pointer-events-none relative min-h-0 flex-1 select-none overflow-hidden border-b bg-muted/50"
          >
            {background}
          </div>
          <div className="p-6 pt-5">
            <H className="text-lg font-semibold tracking-tight">
              {href ? (
                <Link href={href} className="outline-none after:absolute after:inset-0">
                  {title}
                </Link>
              ) : (
                title
              )}
            </H>
            <p className="mt-1.5 max-w-lg text-[15px] text-muted-foreground">{description}</p>
          </div>
        </>
      )}
    </Reveal>
  );
}
