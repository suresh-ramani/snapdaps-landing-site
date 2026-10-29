import { Briefcase, Cake, Heart, Medal, Trophy } from "lucide-react";
import { Face } from "@/components/mock/primitives";
import { Section } from "./section";

export type Testimonial = { quote: string; name: string; role: string; city?: string };

/**
 * Social proof (content doc, Section 4): heading, who it's built for, and testimonials
 * (Tailark testimonials grid style). Testimonials render only when real ones are passed.
 * Client logos are a separate strip (<LogoCloud />) placed under the hero.
 */
export function SocialProof({
  title,
  intro,
  builtFor = "Built for weddings, events, and high-volume photo delivery",
  testimonials = [],
}: {
  title: string;
  intro?: string;
  builtFor?: string;
  testimonials?: Testimonial[];
}) {
  const kinds = [
    { icon: Heart, label: "Weddings" },
    { icon: Cake, label: "Birthday parties" },
    { icon: Briefcase, label: "Corporate events" },
    { icon: Trophy, label: "Award ceremonies" },
    { icon: Medal, label: "Sports tournaments" },
  ];
  return (
    <Section id="trust" title={title} intro={intro} align="center">
      <p className="text-center font-medium">{builtFor}</p>
      <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
        {kinds.map(({ icon: Icon, label }) => (
          <li key={label} className="surface flex items-center gap-2 rounded-full px-4 py-2 text-sm">
            <Icon className="size-4 text-purple" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>

      {testimonials.length > 0 && (
        <ul className="mt-16 columns-1 gap-4 text-left md:columns-2 lg:columns-3 [&>li]:mb-4 [&>li]:break-inside-avoid">
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
