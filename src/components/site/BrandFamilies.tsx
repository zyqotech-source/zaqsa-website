import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  GraduationCap,
  HeartPulse,
  Megaphone,
  Palette,
  Sparkles,
  Vote,
} from "lucide-react";
import { Reveal } from "@/components/site/primitives";

const FAMILIES = [
  {
    name: "Tech",
    line: "Websites, apps and software",
    slug: "website-app-development",
    Icon: Code2,
  },
  {
    name: "AI",
    line: "Artificial intelligence and automation",
    slug: "ai-business-automation",
    Icon: Sparkles,
  },
  { name: "Digital", line: "Marketing, SEO and GEO", slug: "seo-geo", Icon: Megaphone },
  {
    name: "Creative",
    line: "Design, branding and video",
    slug: "graphic-design-branding",
    Icon: Palette,
  },
  {
    name: "Civic",
    line: "Public representatives and civic systems",
    slug: "election-campaign",
    Icon: Vote,
  },
  {
    name: "Edu",
    line: "Schools, coaching and libraries",
    slug: "school-management",
    Icon: GraduationCap,
  },
  { name: "Health", line: "Hospitals and clinics", slug: "hospital-management", Icon: HeartPulse },
  {
    name: "Business",
    line: "Retail, restaurants and SMEs",
    slug: "small-business-solutions",
    Icon: Briefcase,
  },
] as const;

/** The eight areas ZAQSA works in, each linking to its main service page. */
export function BrandFamilies() {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="family-h">
      <div className="container-z">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-teal">The technology &amp; digital growth company</p>
          <h2
            id="family-h"
            className="mt-4 text-[clamp(2.1rem,4.8vw,4rem)] leading-[1.02] font-medium tracking-[-.02em]"
          >
            One company, <em>eight</em> ways to grow.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pick the area closest to your work. Every ZAQSA team shares the same engineers, the same
            standards and the same accountable point of contact.
          </p>
        </Reveal>
        <ul className="family-grid mt-14">
          {FAMILIES.map(({ name, line, slug, Icon }, index) => (
            <Reveal as="li" key={name} delay={index * 60}>
              <Link to="/services/$slug" params={{ slug }} className="family-card group">
                <span className="family-icon">
                  <Icon size={22} strokeWidth={1.6} aria-hidden />
                </span>
                <strong>
                  <small>ZAQSA</small> {name}
                </strong>
                <span>{line}</span>
                <ArrowUpRight className="family-arrow" size={18} aria-hidden />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
