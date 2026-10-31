import { Check } from "lucide-react";
import { DemoForm } from "@/components/demo/demo-form";
import { Section } from "./section";

/**
 * A use-case page's lead capture: an event-specific offer on the left, the demo form on the
 * right (posts to /api/demo with the page's `event` and a preselected role). Sits before the FAQ,
 * so the page's last question is answered by a person, not just the FAQ.
 * Copy promises only what the team does today (a demo, help with the first event, a reply
 * within one working day).
 */
export function LeadCapture({
  title,
  body,
  points,
  event,
  role,
  submitLabel,
  tone = "panel",
}: {
  title: string;
  body: string;
  points: string[];
  /** Sent with the request so the team knows which event it's about. */
  event: string;
  /** Preselects "I am a" in the form. */
  role: string;
  submitLabel: string;
  tone?: "default" | "panel";
}) {
  return (
    <Section id="get-a-demo" tone={tone}>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight md:text-[2.6rem]">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{body}</p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span aria-hidden="true" className="icon-tile size-7 rounded-lg">
                  <Check className="size-4" />
                </span>
                <span className="pt-0.5">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="surface p-6 md:p-8">
          <DemoForm source="use-case" event={event} defaultRole={role} submitLabel={submitLabel} />
        </div>
      </div>
    </Section>
  );
}
