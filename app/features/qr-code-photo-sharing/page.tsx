import Link from "next/link";
import { Check, Download, Link2, QrCode, ScanFace } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { CtaBand } from "@/components/blocks/cta-band";
import { Faq } from "@/components/blocks/faq";
import { Hero } from "@/components/blocks/hero";
import { InfoCards } from "@/components/blocks/info-cards";
import { PageByline } from "@/components/blocks/page-byline";
import { QuestionSection } from "@/components/blocks/question-section";
import { UseCaseLead } from "@/components/blocks/use-case-lead";
import { QrPlacementScene } from "@/components/mock/event-scenes";
import { ShareCard } from "@/components/product/cards";
import { faqs } from "@/content/faqs";
import { isIndexed } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

/* ------------------------------------------------------------------------------------
   FEATURE · QR CODE PHOTO SHARING
   Draft copy by Claude — not from the content doc; reviewed by: pending. noindex until the
   team approves it (content/routes.ts → indexed: true).
   Primary: event photo sharing with QR code. Also: QR code for event photos, QR code photo
   gallery. ("QR code for wedding photos" stays on the wedding page.)
------------------------------------------------------------------------------------ */

const PATH = "/features/qr-code-photo-sharing";
const TITLE = "QR Code Photo Sharing for Events: One Scan, Every Guest | Snapdaps";
const DESCRIPTION =
  "Every Snapdaps event gets its own QR code. Guests scan it with their phone camera, take a selfie and download the photos they appear in — no app, no login.";

export const metadata = buildMetadata({
  absoluteTitle: TITLE,
  description: DESCRIPTION,
  path: PATH,
  noindex: !isIndexed(PATH),
});

const placements = [
  { event: "Weddings", spot: "Welcome board and return-gift cards", href: "/use-cases/wedding-photo-sharing-app" },
  { event: "Birthday parties", spot: "A standee on the cake table", href: "/use-cases/birthday-party" },
  { event: "Corporate events", spot: "Stage screens and badges", href: "/use-cases/corporate-events" },
  { event: "Award ceremonies", spot: "The big screen at the close", href: "/use-cases/award-ceremony" },
  { event: "Sports tournaments", spot: "Scoreboard and registration desk", href: "/use-cases/sports-events" },
];

export default function QrCodePhotoSharingPage() {
  return (
    <>
      <Hero
        above={
          <Breadcrumbs
            items={[
              { name: "Features", path: "/features" },
              { name: "QR code photo sharing", path: PATH },
            ]}
          />
        }
        title="QR Code Photo Sharing for Events"
        subtitle="One scan takes every guest to their own photos."
        body={
          <p>
            Put one QR code where your guests are. They scan it with their phone camera, take a selfie and download the
            photos they appear in — no app, no login, no link to type.
          </p>
        }
        note={<PageByline name={TITLE} description={DESCRIPTION} path={PATH} updated="2026-10-31" />}
        visual={
          <div aria-hidden="true" data-nosnippet>
            <ShareCard className="mx-auto max-w-72" />
          </div>
        }
      />

      <UseCaseLead
        title="QR code photo sharing, in short"
        summary="Every Snapdaps event comes with its own QR code and secure link. Put the QR code where guests will see it — a welcome board, an invitation, a table card or the stage screen — and guests scan it with their phone camera, take a selfie and get the photos they appear in. No app, no login."
        takeaways={[
          "One QR code and one link per event.",
          "Scans with the phone camera — no scanner app.",
          "Guests land in the event and search with a selfie.",
          "Print it, show it on screen or send the link on WhatsApp.",
        ]}
        bestFor={["Event planners", "Photographers", "Hosts"]}
        scene={<QrPlacementScene />}
        sceneCaption="One event QR code, placed wherever guests pause."
        tone="default"
      />

      <QuestionSection
        id="how-qr-sharing-works"
        tone="panel"
        question="How does QR code photo sharing work?"
        answer="Each event gets a QR code. Guests point their phone camera at it, the event opens in their browser, and they upload a selfie. Snapdaps then shows only the photos they appear in, ready to download. The same QR code works for every guest, from the first function to the last."
      >
        <InfoCards
          numbered
          items={[
            { Icon: QrCode, title: "Scan", body: "The phone camera opens the event — no scanner app needed." },
            { Icon: ScanFace, title: "Take a selfie", body: "Snapdaps finds every photo with the guest’s face." },
            { Icon: Download, title: "Download", body: "Guests save their own photos straight to their phone." },
          ]}
        />
      </QuestionSection>

      <QuestionSection
        id="where-to-put-the-qr-code"
        question="Where should you put the QR code at an event?"
        answer="Wherever guests naturally pause: the welcome board or registration desk on arrival, table cards during the meal, the stage screen between sessions, and the invitation or thank-you message before and after. Every copy opens the same event, so you can place it in as many spots as you like."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {placements.map((p) => (
            <li key={p.event}>
              <Link href={p.href} className="surface flex h-full flex-col gap-1 p-5 transition-colors hover:bg-muted/40">
                <span className="text-sm font-medium text-muted-foreground">{p.event}</span>
                <span className="font-semibold tracking-tight">{p.spot}</span>
              </Link>
            </li>
          ))}
        </ul>
      </QuestionSection>

      <QuestionSection
        id="qr-code-or-link"
        tone="panel"
        question="QR code or link — which should you use?"
        answer="Use both. The QR code suits people at the venue, who can scan it in a second. The link suits everyone else — family abroad, guests who have left, colleagues in another office — and travels well on WhatsApp, SMS and email. Both open the same event gallery."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              Icon: QrCode,
              title: "QR code — best at the venue",
              points: ["Boards, table cards, badges, screens", "One scan, no typing", "Works for every guest in the room"],
            },
            {
              Icon: Link2,
              title: "Link — best everywhere else",
              points: ["WhatsApp groups, SMS, email", "Family who couldn’t attend", "Guests after the event"],
            },
          ].map(({ Icon, title, points }) => (
            <div key={title} className="surface p-6">
              <h3 className="flex items-center gap-3 text-lg font-semibold tracking-tight">
                <span aria-hidden="true" className="icon-tile size-9">
                  <Icon className="size-5" />
                </span>
                {title}
              </h3>
              <ul className="mt-4 space-y-2 text-[15px]">
                {points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-after-ink" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </QuestionSection>

      <Faq items={faqs[PATH]} title="QR code sharing questions" />

      <CtaBand title="Give your next event its own QR code" body="Upload once. Share one code. Every guest finds their photos." />
    </>
  );
}
