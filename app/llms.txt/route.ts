import { faqs } from "@/content/faqs";
import { marketingRoutes } from "@/content/routes";
import { coreFeatures, site, workflowSteps } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

/**
 * /llms.txt — a plain-markdown map of the site for AI crawlers and answer engines
 * (format: https://llmstxt.org). Built from the same content the pages use — the definition,
 * indexed marketing routes, core features, the 5-step workflow and each indexed page's FAQ
 * (content/faqs.ts) — so it can't drift out of date. Only indexed routes are listed.
 */
export function GET() {
  const pages = marketingRoutes.filter((r) => r.indexed && r.path !== "/");
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.definition}`,
    "",
    `Website: ${absoluteUrl("/")} · Contact: ${site.contactEmail} · Serving: India`,
    "",
    "## Key pages",
    "",
    ...pages.map((r) => `- [${r.label}](${absoluteUrl(r.path)})`),
    "",
    "## Features",
    "",
    ...coreFeatures.map((f) => `- **${f.title}:** ${f.body}`),
    "",
    "## How it works",
    "",
    ...workflowSteps.map((s, i) => `${i + 1}. **${s.title}** — ${s.subtitle}`),
    "",
    ...marketingRoutes
      .filter((r) => r.indexed && faqs[r.path]?.length)
      .flatMap((r) => [
        r.path === "/" ? "## FAQ" : `## FAQ: ${r.label} (${absoluteUrl(r.path)})`,
        "",
        ...faqs[r.path].flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
      ]),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
