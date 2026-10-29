import { site } from "@/content/site";
import { absoluteUrl, stripHtml } from "@/lib/utils";
import { getPosts } from "@/lib/wp/api";

export const revalidate = 900;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  let items = "";
  try {
    const { posts } = await getPosts({ first: 30 });
    items = posts
      .map(
        (p) => `
    <item>
      <title>${esc(stripHtml(p.title))}</title>
      <link>${absoluteUrl(`/blogs/${p.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blogs/${p.slug}`)}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(stripHtml(p.excerpt))}</description>
      ${p.author?.node.name ? `<dc:creator>${esc(p.author.node.name)}</dc:creator>` : ""}
    </item>`,
      )
      .join("");
  } catch (err) {
    console.error("[rss] WordPress unavailable", err);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(site.name)} blog</title>
    <link>${absoluteUrl("/blogs")}</link>
    <description>${esc(site.description)}</description>
    <language>en-in</language>
    <atom:link href="${absoluteUrl("/blogs/rss.xml")}" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
