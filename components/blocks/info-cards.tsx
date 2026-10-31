import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type InfoCard = { title: string; body: React.ReactNode; Icon?: LucideIcon };

/**
 * A row of plain `surface` cards — icon tile (or step number), title, one or two sentences. The
 * detail under a `QuestionSection` answer: how-to steps, ways to share, what a guest needs.
 * `numbered` only when the cards are a real sequence (renders an <ol> with step numbers).
 */
export function InfoCards({
  items,
  numbered = false,
  headingLevel = "h3",
  className,
}: {
  items: InfoCard[];
  numbered?: boolean;
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  const List = numbered ? "ol" : "ul";
  const H = headingLevel;
  return (
    <List
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        items.length % 3 === 0 && "lg:grid-cols-3",
        items.length % 3 !== 0 && items.length >= 4 && "lg:grid-cols-4",
        className,
      )}
    >
      {items.map(({ title, body, Icon }, i) => (
        <li key={title} className="surface flex flex-col gap-4 p-6">
          {numbered ? (
            <span aria-hidden="true" className="icon-tile size-9 text-sm font-semibold tabular-nums">
              {i + 1}
            </span>
          ) : (
            Icon && (
              <span aria-hidden="true" className="icon-tile size-9">
                <Icon className="size-5" />
              </span>
            )
          )}
          <div>
            <H className="text-lg font-semibold tracking-tight">
              {numbered && <span className="sr-only">Step {i + 1}: </span>}
              {title}
            </H>
            <div className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</div>
          </div>
        </li>
      ))}
    </List>
  );
}
