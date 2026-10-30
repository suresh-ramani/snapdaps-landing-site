import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/json-ld";
import { faqLd } from "@/lib/seo";
import { Section } from "./section";

/**
 * FAQ: centred heading over one `surface` card of hairline-divided questions, the first one open
 * so visitors see an answer straight away, and a contact line under it. Layout after Shadcn UI
 * Kit's free "FAQ 1" block (built here from our own shadcn accordion and tokens — no third-party
 * code), minus its all-caps eyebrow.
 *
 * Renders the matching FAQPage JSON-LD so the two never drift apart. Every answer stays in the
 * server HTML even when collapsed (AccordionContent forceMount).
 */
export function Faq({
  items,
  title = "Frequently asked questions",
  intro,
  contact = true,
  tone,
}: {
  items: { q: string; a: string }[];
  title?: string;
  intro?: React.ReactNode;
  /** Show the "Still have a question?" line linking to /contact. */
  contact?: boolean;
  /** `panel` when the section above is on the page background, to keep the alternating rhythm. */
  tone?: "default" | "panel";
}) {
  return (
    <Section id="faq" title={title} intro={intro} align="center" tone={tone}>
      <div className="surface mx-auto max-w-3xl overflow-hidden text-left">
        <Accordion type="single" collapsible defaultValue="q0">
          {items.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`q${i}`}
              className="px-5 last:border-b-0 data-[state=open]:bg-muted/40 motion-safe:transition-colors md:px-6"
            >
              <AccordionTrigger className="hover:text-foreground">{f.q}</AccordionTrigger>
              <AccordionContent className="pr-6 leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {contact && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Still have a question?{" "}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            Contact us
          </Link>{" "}
          — we reply within one working day.
        </p>
      )}
      <JsonLd data={faqLd(items)} />
    </Section>
  );
}
