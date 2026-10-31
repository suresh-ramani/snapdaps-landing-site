import { Lock, MapPin, QrCode } from "lucide-react";
import { CtaBand } from "@/components/blocks/cta-band";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { PowerLine, Section } from "@/components/blocks/section";
import { StatsBand } from "@/components/blocks/stats-band";
import { isIndexed } from "@/content/routes";
import { founders, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   ABOUT — not in the content doc (Website_Content_*.docx) yet.

   Doc status: no About copy. The intro reuses the home page's promise; "Why we built
   Snapdaps" is a placeholder for the founding story; "What we believe" uses only things the
   site already states elsewhere (privacy controls, no app/login, made in India) — TODO:
   confirm or replace with the doc's wording. Founders: names from the team (content/site.ts →
   founders), no roles or bios until they're supplied. noindex until the copy is final
   (content/routes.ts → indexed: true).
------------------------------------------------------------------------------------ */

const PATH = "/about";

export const metadata = buildMetadata({
  title: "About us",
  description:
    "Snapdaps is an AI photo sharing and face search platform that helps photographers and event planners deliver event photos to every guest in seconds.",
  path: PATH,
  noindex: !isIndexed(PATH),
});

const beliefs = [
  {
    icon: Lock,
    title: "Every guest sees only their own photos",
    body: "Face search shows each guest their own matches, and you decide on downloads, watermarks and PIN access.",
  },
  {
    icon: QrCode,
    title: "No app, no login for guests",
    body: "Guests scan a QR code or open a link, take a selfie, and get their photos — nothing to install.",
  },
  {
    icon: MapPin,
    title: "Made in India",
    body: "Built for weddings and events of every size, from intimate ceremonies to thousands of guests.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section
        as="h1"
        title="About Snapdaps"
        intro={
          <p>
            Snapdaps helps photographers and event planners deliver event photos instantly. Guests find their own
            photos with AI face search — no more pendrives, Drive links or endless follow-ups.
          </p>
        }
      >
        <PowerLine>Upload once. Let AI do the rest.</PowerLine>
      </Section>

      {/* TODO: founding story from the content doc. */}
      <Section id="story" tone="panel" title="Why we built Snapdaps">
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>Placeholder: the problem the founders saw at events — photographers chasing delivery, guests waiting weeks.</p>
          <p>Placeholder: the moment that led to Snapdaps, and who it is for.</p>
          <p>Placeholder: where Snapdaps is today and what comes next.</p>
        </div>
      </Section>

      <Section id="founders" title={`The people behind ${site.name}`}>
        <ul className="grid gap-4 sm:grid-cols-3">
          {founders.map((f) => (
            <li key={f.name} className="surface flex items-center gap-4 p-6">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-base font-semibold text-muted-foreground"
              >
                {f.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{f.name}</h3>
                <p className="text-sm text-muted-foreground">Founder</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <StatsBand />

      <Section id="beliefs" title="What we believe">
        <ul className="grid gap-4 md:grid-cols-3">
          {beliefs.map((b) => (
            <li key={b.title} className="surface p-6">
              <span className="icon-tile" aria-hidden="true">
                <b.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-muted-foreground">{b.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <LogoCloud />
      <CtaBand title="Start delivering photos the smart way" body="Upload once. Let AI do the rest." />
    </>
  );
}
