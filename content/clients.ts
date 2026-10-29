/**
 * CLIENT LOGOS
 *
 * 1. Put each logo file in /public/clients/ — SVG/WebP/PNG, about 3× display size (logos show ~36px tall).
 * 2. Add one entry per client below. `width`/`height` are the file's real pixel size,
 *    used only for the aspect ratio.
 * 3. `mono: true` for single-colour (black) artwork: it's shown dark on light and inverted to white
 *    in dark mode. Colour logos show in greyscale and turn to full colour on hover.
 * 4. Only list clients who have agreed to appear on the site.
 * 5. Order = priority. The strip under the hero scrolls through all of them (any number);
 *    the client grid in the home "Trusted by" section shows the first 8.
 *
 * While this list is empty the logo section is hidden on the live site
 * (in `npm run dev` you'll see placeholder slots showing where logos go).
 *
 * Current logos were taken from the live snapdaps.ai "Trusted by Businesses Worldwide" strip
 * (trimmed, white artwork recoloured dark for the light theme).
 */

export type Client = {
  /** Company name — used as the image alt text. */
  name: string;
  /** Path under /public, e.g. "/clients/acme.svg". */
  logo: string;
  width: number;
  height: number;
  /** Single-colour artwork (dark), inverted in dark mode. */
  mono?: boolean;
  /** Optional link to their site or profile. */
  href?: string;
};

export const clients: Client[] = [
  { name: "Foto Factory", logo: "/clients/foto-factory.webp", width: 251, height: 96, mono: true, href: "https://www.instagram.com/foto_factory.in/" },
  { name: "Wedding By Sangath", logo: "/clients/wedding-by-sangath.webp", width: 124, height: 96, mono: true, href: "https://www.instagram.com/weddingbysangath/" },
  { name: "Sagar Gadani Photography", logo: "/clients/sagar-gadani-photography.webp", width: 115, height: 96, mono: true, href: "https://www.instagram.com/sagargadaniphotography/" },
  { name: "AJ Fotography", logo: "/clients/aj-fotography.webp", width: 105, height: 96, mono: true, href: "https://www.instagram.com/ajfotography/" },
  { name: "Adani", logo: "/clients/adani.webp", width: 283, height: 96 },
  { name: "SBI", logo: "/clients/sbi.webp", width: 273, height: 96 },
  { name: "Cipla", logo: "/clients/cipla.webp", width: 287, height: 96 },
  { name: "TCS", logo: "/clients/tcs.webp", width: 347, height: 96 },
];

export const clientsHeading = "Trusted by businesses worldwide";
