import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/json-ld";
import { faqLd } from "@/lib/seo";
import { Section } from "./section";

/** Renders the accordion and the matching FAQPage JSON-LD together so they never drift apart. */
export function Faq({ items, title = "Questions" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <Section id="faq" title={title}>
      <div className="max-w-3xl">
        <Accordion type="single" collapsible className="border-t">
          {items.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <JsonLd data={faqLd(items)} />
    </Section>
  );
}
