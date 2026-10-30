import {
  EventOverviewCard,
  FaceMatchCard,
  GalleryCard,
  GuestActivityCard,
  PrivacyCard,
  SelfieSearchCard,
  ShareCard,
  UploadCard,
} from "./cards";

/**
 * Masonry "product wall" (pattern from ui.shadcn.com's homepage CardsDemo, MIT):
 * columns of real product cards on a muted backdrop, fading out at the bottom.
 * Columns appear progressively with screen width so phones show one clean column.
 */
export function ProductWall() {
  return (
    <div
      aria-hidden="true" data-nosnippet
      className="relative overflow-hidden rounded-t-[1.75rem] border-x border-t bg-muted/70 px-4 pt-6 [--gap:1rem] md:px-6 md:pt-8 lg:[--gap:1.25rem] dark:bg-muted/40"
    >
      <div className="mx-auto grid max-h-[46rem] gap-(--gap) md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="flex flex-col gap-(--gap)">
          <FaceMatchCard />
          <PrivacyCard />
        </div>
        <div className="hidden flex-col gap-(--gap) md:flex">
          <EventOverviewCard />
          <ShareCard />
        </div>
        <div className="hidden flex-col gap-(--gap) lg:flex">
          <UploadCard />
          <GuestActivityCard />
        </div>
        <div className="hidden flex-col gap-(--gap) xl:flex">
          <SelfieSearchCard />
          <GalleryCard />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}
