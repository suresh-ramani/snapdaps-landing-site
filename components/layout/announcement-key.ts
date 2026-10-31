/**
 * localStorage key for a dismissed announcement: JSON `{ id, at }` (at = ms timestamp). A dismissal
 * hides that announcement for DISMISS_DAYS, then it shows again — so a long-running offer isn't lost
 * for good after one click (old plain-string values are ignored, i.e. reset).
 */
export const ANNOUNCEMENT_KEY = "snapdaps:announcement-dismissed";
export const DISMISS_DAYS = 7;
