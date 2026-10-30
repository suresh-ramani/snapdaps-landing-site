import {
  ArrowLeft,
  BatteryFull,
  Camera,
  CheckCheck,
  EllipsisVertical,
  Mic,
  Paperclip,
  Phone,
  PhoneMissed,
  Signal,
  Smile,
  Video,
  Wifi,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { cn, hindiLang } from "@/lib/utils";
import { Face, PhoneFrame } from "./primitives";

/**
 * WhatsApp-style chat screen (current Android light theme: white header, beige doodle
 * wallpaper, white/green bubbles with tails, missed-call bubbles, green mic button).
 * A recreation for illustration only — no WhatsApp logo or trademarks. Decorative (aria-hidden
 * via PhoneFrame); the surrounding section text says the same thing.
 *
 * Colours are WhatsApp's own and intentionally theme-independent (it's a picture of a phone).
 */

export type WaItem =
  | { type: "date"; text: string }
  | { type: "in"; text: string; time: string; from?: string }
  | { type: "out"; text: string; time: string }
  | { type: "missed"; time: string; video?: boolean };

const SENDER_COLORS = ["#e542a3", "#1f7aec", "#d3396d", "#029d00", "#b4876e", "#7f66ff"];

// Faint doodle wallpaper (WhatsApp-like), as an inline SVG pattern.
const DOODLES = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none" stroke="#d9d1c4" stroke-opacity="0.75" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="14" cy="14" r="6"/><path d="M40 8l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z"/>
    <path d="M72 10c-3-4-9-1-7 4l7 7 7-7c2-5-4-8-7-4z"/><rect x="8" y="40" width="16" height="12" rx="3"/><circle cx="16" cy="46" r="3"/>
    <path d="M44 44c6-6 14 2 8 8"/><path d="M70 40v14M63 47h14"/><path d="M12 76l6-6 6 6"/><circle cx="46" cy="76" r="4"/>
    <path d="M66 70c4 0 8 3 8 8"/><path d="M84 30l4 4M88 30l-4 4"/><path d="M30 28h6"/><path d="M86 86c-2-3 1-6 4-4"/>
  </svg>`,
);

export function WhatsAppChat({
  contact,
  status = "online",
  unread,
  seed = 2,
  items,
  group = false,
  reveal = false,
  screenHeight = "h-[27rem]",
  className,
}: {
  contact: string;
  status?: string;
  unread?: number;
  seed?: number;
  items: WaItem[];
  /** Group chat: incoming bubbles show coloured sender names. */
  group?: boolean;
  /** Bubbles pop in one after another when the phone scrolls into view (Story chat). */
  reveal?: boolean;
  /** Height of the screen inside the phone frame (a Tailwind height class). */
  screenHeight?: string;
  className?: string;
}) {
  const senders = Array.from(new Set(items.flatMap((m) => (m.type === "in" && m.from ? [m.from] : []))));

  return (
    <PhoneFrame className={cn("w-[16rem]", className)}>
      <div className={cn("flex flex-col bg-[#efeae2] font-sans text-[#111b21] antialiased", screenHeight)}>
        {/* Status bar */}
        <div className="flex items-center justify-between bg-white px-5 pb-1 pt-2.5 text-[10px] font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Signal className="size-3" strokeWidth={2.5} />
            <Wifi className="size-3" strokeWidth={2.5} />
            <BatteryFull className="size-3.5" strokeWidth={2} />
          </span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-1.5 border-b border-black/5 bg-white px-2 pb-2 pt-1">
          <span className="flex items-center">
            <ArrowLeft className="size-4" strokeWidth={2.2} />
            {unread !== undefined && <span className="ml-0.5 text-[11px] font-medium">{unread}</span>}
          </span>
          <Face seed={seed} className="ml-0.5 size-7 shrink-0" />
          <div className="min-w-0 flex-1 pl-1 leading-tight">
            <p className="truncate text-[12px] font-semibold">{contact}</p>
            <p className={cn("truncate text-[9.5px]", status === "typing…" ? "text-[#00a884]" : "text-[#667781]")}>
              {status}
            </p>
          </div>
          <Video className="size-4" strokeWidth={1.9} />
          <Phone className="ml-2.5 size-[15px]" strokeWidth={1.9} />
          <EllipsisVertical className="ml-1.5 size-4" strokeWidth={2} />
        </div>

        {/* Messages */}
        <RevealGroup
          as="div"
          stagger={reveal ? 0.35 : 0}
          amount={0.5}
          className="flex flex-1 flex-col justify-end gap-[3px] overflow-hidden px-2.5 pb-2 pt-2"
          style={{ backgroundImage: `url("data:image/svg+xml,${DOODLES}")`, backgroundSize: "96px 96px" }}
        >
          {items.map((m, i) => {
            const prev = items[i - 1];
            const first = !prev || prev.type !== m.type || (m.type === "in" && prev.type === "in" && prev.from !== m.from);
            if (m.type === "date")
              return (
                <span
                  key={i}
                  className="mx-auto my-1.5 rounded-md bg-white px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-[#54656f] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]"
                >
                  {m.text}
                </span>
              );
            if (m.type === "missed")
              return (
                <div key={i} className={cn("relative self-start", first && "mt-1.5")}>
                  {first && <Tail side="in" />}
                  <div className="flex items-center gap-2 rounded-lg bg-white py-1.5 pl-1.5 pr-2 shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]">
                    <span className="flex size-6 items-center justify-center rounded-full bg-[#fde8e8]">
                      <PhoneMissed className="size-3.5 text-[#ea0038]" strokeWidth={2.2} />
                    </span>
                    <span className="text-[11px] font-medium">Missed {m.video ? "video" : "voice"} call</span>
                    <span className="self-end pl-1 text-[8.5px] text-[#667781]">{m.time}</span>
                  </div>
                </div>
              );
            const isIn = m.type === "in";
            const color = isIn && m.from ? SENDER_COLORS[senders.indexOf(m.from) % SENDER_COLORS.length] : undefined;
            return (
              <Bubble
                key={i}
                reveal={reveal}
                className={cn("relative max-w-[86%]", isIn ? "self-start origin-top-left" : "self-end origin-top-right", first && "mt-1.5")}
              >
                {first && <Tail side={isIn ? "in" : "out"} />}
                <div
                  className={cn(
                    "rounded-lg px-2 pb-1 pt-1 text-[11px] leading-[1.35] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]",
                    isIn ? "bg-white" : "bg-[#d9fdd3]",
                    first && (isIn ? "rounded-tl-none" : "rounded-tr-none"),
                  )}
                >
                  {group && isIn && first && m.from && (
                    <p className="text-[10px] font-semibold" style={{ color }}>
                      {m.from}
                    </p>
                  )}
                  <span lang={hindiLang(m.text)}>{m.text}</span>
                  <span className="float-right ml-2 mt-1.5 flex items-center gap-0.5 text-[8.5px] leading-none text-[#667781]">
                    {m.time}
                    {!isIn && <CheckCheck className="size-3 text-[#53bdeb]" strokeWidth={2.2} />}
                  </span>
                </div>
              </Bubble>
            );
          })}
        </RevealGroup>

        {/* Input bar */}
        <div className="flex items-center gap-1.5 px-1.5 pb-2.5 pt-1">
          <div className="flex flex-1 items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[#8696a0] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]">
            <Smile className="size-4" strokeWidth={1.9} />
            <span className="flex-1 text-[11px]">Message</span>
            <Paperclip className="size-3.5 -rotate-45" strokeWidth={1.9} />
            <Camera className="size-4" strokeWidth={1.9} />
          </div>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white">
            <Mic className="size-4" strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}

/** A message bubble's wrapper: pops in when `reveal` is on, a plain div otherwise. */
function Bubble({ reveal, className, children }: { reveal: boolean; className: string; children: React.ReactNode }) {
  return reveal ? (
    <Reveal preset="pop" className={className}>
      {children}
    </Reveal>
  ) : (
    <div className={className}>{children}</div>
  );
}

/** Bubble tail (top corner notch). */
function Tail({ side }: { side: "in" | "out" }) {
  return (
    <svg
      viewBox="0 0 8 13"
      className={cn("absolute top-0 h-[13px] w-2", side === "in" ? "-left-[7px]" : "-right-[7px] -scale-x-100")}
      aria-hidden="true"
    >
      <path d="M8 0H0.5C0 0 -0.2 0.7 0.3 1.1L8 9z" fill={side === "in" ? "#ffffff" : "#d9fdd3"} />
    </svg>
  );
}
