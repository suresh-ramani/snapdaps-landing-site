import { Face } from "@/components/mock/primitives";
import { Section } from "./section";
import { StatsBand, hasStats } from "./stats-band";
import { VideoTestimonials, hasVideoTestimonials } from "./video-testimonials";

export type Testimonial = { quote: string; name: string; role: string; city?: string };

/**
 * Social proof (content doc, Section 4), home only:
 * - Trust statistics (StatsBand, data in content/stats.ts) open the section.
 * - Video testimonials (VideoTestimonials, data in content/video-testimonials.ts) follow.
 * - Written testimonials render only when real ones are passed. Never invent quotes or numbers.
 * The whole section renders nothing until at least one of these has something to show, so the live
 * site never shows a heading over an empty band. Client logos live in the LogoCloud under the hero;
 * event types are linked from the nav and /use-cases.
 */
export function SocialProof({
  title,
  intro,
  testimonials = [],
}: {
  title: string;
  intro?: string;
  testimonials?: Testimonial[];
}) {
  const stats = hasStats();
  if (!stats && !hasVideoTestimonials() && testimonials.length === 0) return null;

  return (
    <Section id="trust" title={title} intro={intro} align="center">
      {stats && <StatsBand embedded />}

      <VideoTestimonials className={stats ? "mt-16" : undefined} />

      {testimonials.length > 0 && (
        <ul className="mt-4 columns-1 gap-4 text-left md:columns-2 lg:columns-3 [&>li]:mb-4 [&>li]:break-inside-avoid">
          {testimonials.map((t, i) => (
            <li key={t.name} className="surface p-6">
              <blockquote className="text-[15px] leading-relaxed">“{t.quote}”</blockquote>
              <div className="mt-6 flex items-center gap-3">
                <Face seed={i} className="size-10" />
                <div className="text-sm">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-muted-foreground">
                    {t.role}
                    {t.city && `, ${t.city}`}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
