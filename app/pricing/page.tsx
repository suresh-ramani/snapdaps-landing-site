import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { CtaBand } from "@/components/blocks/cta-band";
import { Faq } from "@/components/blocks/faq";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { OfferNote, OfferStrip, isOffer } from "@/components/blocks/offer-callout";
import { PageByline } from "@/components/blocks/page-byline";
import { PlanComparison } from "@/components/blocks/plan-comparison";
import { PricingPlans, type PlanCard } from "@/components/blocks/pricing-plans";
import { Section } from "@/components/blocks/section";
import { StatsBand } from "@/components/blocks/stats-band";
import { JsonLd } from "@/components/json-ld";
import { faqs } from "@/content/faqs";
import { comingSoonPlanFeatures, paidPlanFeatures, planTaglines, site } from "@/content/site";
import { bestYearlySaving, formatPrice, getPlans, planSignupHref, type Plan } from "@/lib/plans";
import { buildMetadata, softwareLd } from "@/lib/seo";
import { getAnnouncement } from "@/lib/wp/api";

/* ------------------------------------------------------------------------------------
   PRICING — plans, prices and limits come live from the app's plans API (lib/plans.ts), rendered
   on the server so every price is in the HTML. Copy around them: content/site.ts
   (paidPlanFeatures, planTaglines) and content/faqs.ts. The current offer card comes from
   WordPress → Settings → Announcement (Style: Offer).
------------------------------------------------------------------------------------ */

const PATH = "/pricing";
const TITLE = "Pricing";
const DESCRIPTION =
  "Snapdaps plans for photographers and studios: start free, then pick the storage you need. Every paid plan includes unlimited events and AI face search.";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

function toCard(p: Plan): PlanCard {
  const fmt = (n: number) => formatPrice(n, p.currency);
  return {
    key: p.key,
    name: p.name,
    popular: p.popular,
    free: p.free,
    tagline: planTaglines[p.key] ?? "",
    limits: [
      { label: "Storage", value: p.limits.storage },
      { label: "Events", value: p.limits.events },
      { label: "Max photo size", value: p.limits.maxUpload },
    ],
    extras: p.free
      ? ["Unlimited AI face search", "Email notifications"]
      : ["Unlimited AI face search", "Original-quality photos", "Apple HEIC photos"],
    monthly: p.monthly
      ? { regular: fmt(p.monthly.regular), price: fmt(p.monthly.price), href: planSignupHref(p.monthly.puid) }
      : undefined,
    yearly: p.yearly
      ? {
          regular: fmt(p.yearly.regular),
          price: fmt(p.yearly.price),
          perMonth: fmt(Math.round(p.yearly.price / 12)),
          href: planSignupHref(p.yearly.puid),
        }
      : undefined,
    href: planSignupHref(p.monthly?.puid ?? p.yearly?.puid),
    cta: p.free ? "Start free" : `Get started with ${p.name}`,
  };
}

export default async function PricingPage() {
  const [plans, announcement] = await Promise.all([getPlans(), getAnnouncement()]);
  const offer = isOffer(announcement) ? announcement : null;

  // Search engines get every real price as an Offer (monthly price per plan, INR).
  const offers = (plans ?? [])
    .filter((p) => p.monthly)
    .map((p) => ({ name: `${p.name} (monthly)`, price: p.monthly!.price }));

  return (
    <>
      {/* Plans must be on the first screen: short header, slim offer strip, byline below the plans. */}
      <Section
        as="h1"
        align="center"
        title="Simple pricing for every event"
        className="pt-10! md:pt-14!"
        headerClassName="mb-6 max-w-5xl md:mb-8"
        intro={<p>Start free. Every paid plan includes unlimited events and AI face search.</p>}
      >
        {offer && <OfferStrip offer={offer} className="mb-6" />}
        {plans ? (
          <PricingPlans plans={plans.map(toCard)} yearlySaving={bestYearlySaving(plans)} />
        ) : (
          <div className="surface mx-auto max-w-xl p-8 text-center">
            <p className="text-lg font-semibold">Plans are loading slowly right now.</p>
            <p className="mt-2 text-muted-foreground">
              See every plan and price in the Snapdaps app, or{" "}
              <Link href="/contact" className="font-medium text-primary hover:underline">
                ask our team
              </Link>
              .
            </p>
            <a href={site.signupUrl} className="mt-5 inline-block font-medium text-primary hover:underline">
              Open the app
            </a>
          </div>
        )}
        <PageByline
          name={`${TITLE} | ${site.name}`}
          description={DESCRIPTION}
          path={PATH}
          updated="2026-10-31"
          className="mt-8 text-center"
        />
      </Section>

      <Section id="every-paid-plan" tone="panel" title="Included in every paid plan">
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {paidPlanFeatures.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-after-ink" aria-hidden="true" />
              {f}
            </li>
          ))}
          {comingSoonPlanFeatures.map((f) => (
            <li key={f} className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-muted-foreground">
              <Clock className="size-4 shrink-0" aria-hidden="true" />
              {f}
              <span className="rounded-full bg-purple-soft px-2 py-0.5 text-xs font-medium text-purple">Coming soon</span>
            </li>
          ))}
        </ul>
      </Section>

      {plans && (
        <Section id="compare" title="Compare plans" intro={<p>Every plan side by side — prices, storage and limits.</p>}>
          <PlanComparison plans={plans} />
        </Section>
      )}

      <StatsBand />
      <LogoCloud />
      <Faq
        items={faqs[PATH]}
        title="Pricing questions"
        tone="panel"
        intro={
          <p>
            Plans, billing and refunds in short. The full terms are in our{" "}
            <Link href="/refund-policy" className="font-medium text-primary hover:underline">
              refund and cancellation policy
            </Link>
            .
          </p>
        }
      />
      <CtaBand
        title="Start delivering photos the smart way"
        body="Upload once. Let AI do the rest."
        note={offer ? <OfferNote offer={offer} /> : undefined}
      />
      <JsonLd data={softwareLd(offers)} />
    </>
  );
}
