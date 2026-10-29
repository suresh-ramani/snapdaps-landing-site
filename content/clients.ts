/**
 * CLIENT LOGOS
 *
 * 1. Put each logo file in /public/clients/ — SVG preferred (PNG/WebP fine, ~2× display size).
 *    Use the logo's own colours; the section shows them in greyscale and colours them on hover.
 * 2. Add one entry per client below. `width`/`height` are the file's real pixel size,
 *    used only for the aspect ratio. Logos are displayed ~32px tall.
 * 3. Only list clients who have agreed to appear on the site.
 *
 * While this list is empty the logo section is hidden on the live site
 * (in `npm run dev` you'll see placeholder slots showing where logos go).
 *
 * Example:
 *   { name: "Studio Lumière", logo: "/clients/studio-lumiere.svg", width: 160, height: 40, href: "https://…" },
 */

export type Client = {
  /** Company name — used as the image alt text. */
  name: string;
  /** Path under /public, e.g. "/clients/acme.svg". */
  logo: string;
  width: number;
  height: number;
  /** Optional link to their site. */
  href?: string;
};

export const clients: Client[] = [
  // TODO: add client logos
];

export const clientsHeading = "Trusted by photographers, studios & event companies";
