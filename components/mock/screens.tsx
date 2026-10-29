/**
 * Story illustrations (chat thread). Pain-point pictures live in pain-illustrations.tsx. Product UI lives in components/product/cards.tsx.
 */
import { Face, PhoneFrame } from "./primitives";

/* ----------------------------------------------------------------------------
   Story sections: a chat thread of people asking for photos.
---------------------------------------------------------------------------- */
export function ChatMock({
  title = "Family group",
  messages,
  reply,
}: {
  title?: string;
  messages: string[];
  reply?: React.ReactNode;
}) {
  return (
    <PhoneFrame className="w-[15rem]">
      <div className="bg-[#efe7dd] pb-4 dark:bg-[#1b1f27]">
        <div className="flex items-center gap-2 bg-[#075e54] px-3 pb-2.5 pt-8 text-white">
          <Face seed={6} className="size-7" />
          <div>
            <p className="text-[11px] font-semibold">{title}</p>
            <p className="text-[9px] opacity-80">online</p>
          </div>
        </div>
        <div className="space-y-1.5 px-3 pt-3">
          {messages.map((m, i) => (
            <div key={i} className="flex items-end gap-1.5">
              <Face seed={i + 1} className="size-5 shrink-0" />
              <p className="max-w-[80%] rounded-lg rounded-bl-none bg-white px-2.5 py-1.5 text-[11px] text-[#15171e] shadow-sm dark:bg-[#2a2e38] dark:text-[#eef0f5]">
                {m}
              </p>
            </div>
          ))}
          {reply && <div className="flex justify-end">{reply}</div>}
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ----------------------------------------------------------------------------
   Pain-point visuals for the scroll-synced problem section.
---------------------------------------------------------------------------- */
