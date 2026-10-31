/** One legal document, rendered by `LegalPage` (components/legal/legal-page.tsx). */
export type LegalDoc = {
  title: string;
  /** Meta description (ours, not part of the legal text). */
  description: string;
  /** "Last updated" date of the text, YYYY-MM-DD. */
  updated: string;
  /** The document body as trusted HTML: h2/h3 with ids, p, ul/ol, table, strong, em, a. No H1. */
  html: string;
};
