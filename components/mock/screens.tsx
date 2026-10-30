/**
 * Story illustrations. `ChatMock` shows a WhatsApp-style group chat (see whatsapp.tsx) of
 * friends and family asking for photos. Pain-point pictures live in pain-illustrations.tsx;
 * product UI lives in components/product/cards.tsx.
 */
import { WhatsAppChat, type WaItem } from "./whatsapp";

const NAMES = ["Priya", "Kabir", "Neha", "Aunty ji", "Rahul", "Meera"];
const TIMES = ["8:12 am", "8:14 am", "9:30 am", "10:05 am", "10:06 am", "11:48 am"];

export function ChatMock({
  title = "Family group",
  messages,
  status,
}: {
  title?: string;
  messages: string[];
  status?: string;
}) {
  const items: WaItem[] = [
    { type: "date", text: "Today" },
    ...messages.map((text, i) => ({
      type: "in" as const,
      text,
      time: TIMES[i % TIMES.length],
      from: NAMES[i % NAMES.length],
    })),
  ];
  return (
    <WhatsAppChat
      contact={title}
      status={status ?? `${NAMES.slice(0, 3).join(", ")}, You`}
      seed={6}
      group
      reveal
      items={items}
    />
  );
}
