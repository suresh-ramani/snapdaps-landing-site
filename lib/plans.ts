import "server-only";
import { site } from "@/content/site";

/**
 * Plans and prices from the Snapdaps app API (PLANS_API_URL, default
 * https://app.snapdaps.ai/backend/api/v2/plans). Read on the server so every price is in the page's
 * HTML (search engines and AI answers see them — the old pricing page only rendered "Loading…").
 * Cached in the Next data cache for 10 minutes under the `plans` tag (POST /api/revalidate
 * {"type":"plans"} refreshes it); a 3s timeout means a slow API never holds up the page.
 *
 * The API returns one entry per plan *and* billing period; they're grouped by plan name (the Studio
 * plan uses different keys per period), sorted by `sortOrder`, public + active only.
 */

const PLANS_API_URL = process.env.PLANS_API_URL ?? "https://app.snapdaps.ai/backend/api/v2/plans";
export const PLANS_TAG = "plans";

type ApiFeature = {
  feature: { key: string; name: string; valueType: "boolean" | "numeric" };
  isUnlimited: boolean;
  valueBoolean: boolean;
  displayValue: string;
};
type ApiPlan = {
  name: string;
  key: string;
  /** The plan's id in the app (one per plan *and* billing period) — used in /pricing/{puid}. */
  puid: string;
  billingPeriod: "monthly" | "yearly";
  currency: string;
  basePrice: string;
  discountPrice: string;
  isPublic: boolean;
  isActive: boolean;
  isPopular: boolean;
  sortOrder: number;
  /** Free trial days the app gives on this plan (0 = none set). */
  trialDays: number;
  planFeatures: ApiFeature[];
};

export type Billing = "monthly" | "yearly";
export type PlanPrice = { regular: number; price: number; /** App plan id for this billing period. */ puid: string };
export type PlanLimits = {
  storage: string;
  events: string;
  maxUpload: string;
  faceSearch: string;
  heic: boolean;
  originalQuality: boolean;
  emailNotifications: boolean;
};
export type Plan = {
  name: string;
  /** Monthly key (stable id for the plan). */
  key: string;
  popular: boolean;
  free: boolean;
  currency: string;
  monthly?: PlanPrice;
  yearly?: PlanPrice;
  limits: PlanLimits;
  /** Free trial length in days on paid plans (0 on Free): the API's `trialDays`, else `site.trialDays`. */
  trialDays: number;
};

const num = (s: string) => Math.round(Number.parseFloat(s) || 0);

function limitsOf(features: ApiFeature[]): PlanLimits {
  const f = (key: string) => features.find((x) => x.feature.key === key);
  const value = (key: string) => {
    const x = f(key);
    if (!x) return "—";
    return x.isUnlimited ? "Unlimited" : x.displayValue || "—";
  };
  const bool = (key: string) => {
    const x = f(key);
    return Boolean(x && (x.isUnlimited || x.valueBoolean));
  };
  return {
    storage: value("storage_bytes"),
    events: value("max_events"),
    maxUpload: value("max_photo_upload_size"),
    faceSearch: value("face_search"),
    heic: bool("heic_support"),
    originalQuality: bool("uncompressed_photos"),
    emailNotifications: bool("email_notifications"),
  };
}

/** Public plans grouped by name, or null when the API can't be reached (the page shows a fallback). */
export async function getPlans(): Promise<Plan[] | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(PLANS_API_URL, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate: 600, tags: [PLANS_TAG] },
    }).finally(() => clearTimeout(timer));
    if (!res.ok) throw new Error(`plans API responded ${res.status}`);
    const json = (await res.json()) as { data?: ApiPlan[] };
    const rows = (json.data ?? []).filter((p) => p.isPublic && p.isActive);
    if (!rows.length) return null;

    const byName = new Map<string, ApiPlan[]>();
    for (const row of rows) byName.set(row.name, [...(byName.get(row.name) ?? []), row]);

    return [...byName.values()]
      .sort((a, b) => a[0].sortOrder - b[0].sortOrder)
      .map((group) => {
        const monthly = group.find((p) => p.billingPeriod === "monthly");
        const yearly = group.find((p) => p.billingPeriod === "yearly");
        const main = monthly ?? yearly ?? group[0];
        const price = (p?: ApiPlan): PlanPrice | undefined =>
          p ? { regular: num(p.basePrice), price: num(p.discountPrice) || num(p.basePrice), puid: p.puid } : undefined;
        const free = group.every((p) => num(p.basePrice) === 0);
        return {
          // API names are mixed case ("FREE", "Pro Plus"); show them in title case.
          name: main.name === main.name.toUpperCase() ? main.name.charAt(0) + main.name.slice(1).toLowerCase() : main.name,
          key: main.key,
          popular: group.some((p) => p.isPopular),
          free,
          currency: main.currency || "INR",
          // Free has one entry (monthly); both periods point at it.
          monthly: price(monthly) ?? (free ? { regular: 0, price: 0, puid: main.puid } : undefined),
          yearly: price(yearly) ?? (free ? { regular: 0, price: 0, puid: main.puid } : undefined),
          limits: limitsOf(main.planFeatures),
          trialDays: free ? 0 : Math.max(0, ...group.map((p) => Number(p.trialDays) || 0)) || site.trialDays,
        };
      });
  } catch (err) {
    console.error("[plans] couldn't load plans", err);
    return null;
  }
}

/**
 * Where a plan's button goes: the app's page for that plan and billing period,
 * `https://app.snapdaps.ai/pricing/{puid}`. Falls back to sign-up if the API sent no id.
 */
export function planSignupHref(puid?: string) {
  return puid ? `${site.appUrl}/pricing/${encodeURIComponent(puid)}` : site.signupUrl;
}

/** "₹3,599" */
export function formatPrice(amount: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

/** Best yearly saving across plans vs paying monthly for 12 months, as a whole percent. */
export function bestYearlySaving(plans: Plan[]) {
  const savings = plans
    .filter((p) => !p.free && p.monthly && p.yearly && p.monthly.price > 0)
    .map((p) => 1 - p.yearly!.price / (p.monthly!.price * 12));
  return savings.length ? Math.floor(Math.max(...savings) * 100) : 0;
}
