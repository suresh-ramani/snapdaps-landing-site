import { Face } from "@/components/mock/primitives";
import { cn } from "@/lib/utils";

/**
 * A slowly scrolling strip of client messages: the "this is exactly my problem" moment.
 * Marquee pattern after Magic UI's Marquee (MIT, github.com/magicuidesign/magicui), using the
 * CSS-only `animate-marquee` utility in globals.css (pauses on hover, static under reduced motion).
 * Two rows scroll in opposite directions (`--marquee-direction`) at slightly different speeds.
 *
 * The first copy of the list is the readable one; the duplicate that makes the loop seamless
 * is hidden from assistive tech.
 */

export type ChatMessage = { text: string; from: string; time: string };

export function ChatMarquee({
  messages,
  label = "Messages photographers get after every event",
  className,
}: {
  messages: ChatMessage[];
  label?: string;
  className?: string;
}) {
  const half = Math.ceil(messages.length / 2);
  const rows = [messages, [...messages.slice(half), ...messages.slice(0, half)]];
  return (
    <div className={cn("relative", className)}>
      <p className="sr-only">{label}</p>
      <div className="space-y-3 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        {rows.map((row, r) => (
          <div
            key={r}
            className={cn(
              "group flex overflow-hidden [--marquee-gap:1.75rem]",
              // Second row runs the other way, a touch slower, so the rows never mirror each other.
              r === 0 ? "[--marquee-duration:55s]" : "[--marquee-direction:reverse] [--marquee-duration:63s]",
            )}
          >
            <div className="flex w-max gap-(--marquee-gap) motion-safe:animate-marquee">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1 || r === 1 ? true : undefined}
                  className="flex shrink-0 gap-(--marquee-gap)"
                >
                  {row.map((m, i) => (
                    <li key={`${copy}-${i}`} className="flex items-end gap-1.5">
                      <Face seed={(i + r * 3) % 8} className="size-7 shrink-0" />
                      <div className="surface rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm">
                        <p className="whitespace-nowrap font-medium">{m.text}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {m.from}, {m.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
