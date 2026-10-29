import { Mail, MessageCircle } from "lucide-react";
import { DemoForm } from "@/components/demo/demo-form";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

/* CONTACT — demo booking + contact. Requests are emailed to the team via /api/demo. */

export const metadata = buildMetadata({
  title: "Contact & book a demo",
  description:
    "Book a Snapdaps demo or contact the team. See how AI face search delivers event photos to every guest instantly.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.025em] md:text-6xl">Book a demo</h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            See how Snapdaps lets your clients and guests find their photos with a selfie. Tell us a little about your
            events and we&apos;ll set up a short walkthrough.
          </p>
          <ul className="mt-10 space-y-4">
            <li className="flex items-start gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-medium">Email</p>
                <a href={`mailto:${site.contactEmail}`} className="text-muted-foreground hover:text-primary">
                  {site.contactEmail}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <MessageCircle className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-medium">WhatsApp</p>
                {/* TODO: add the team's WhatsApp number */}
                <p className="text-muted-foreground">Placeholder: WhatsApp number</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-card p-6 md:p-10">
          <h2 className="font-display text-2xl font-semibold">Request a demo</h2>
          <p className="mt-2 text-muted-foreground">We&apos;ll reply within one working day.</p>
          <div className="mt-8">
            <DemoForm source="contact" showMessage />
          </div>
        </div>
      </div>
    </section>
  );
}
