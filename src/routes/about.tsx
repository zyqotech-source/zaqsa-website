import { createFileRoute } from "@tanstack/react-router";
import { GlassButton, PageHero, Reveal } from "@/components/site/primitives";
import { COMPANY } from "@/lib/content";
import { seo } from "@/lib/seo";
import { AboutVisual } from "@/components/site/hero-visuals";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About ZYQO — Meet Founder Chinmay Anand",
      "ZYQO is a New Delhi technology and business solutions company founded by Chinmay Anand. Learn what we believe and where we're going.",
    ),
  component: Page,
});

const BLOCKS = [
  [
    "Who we are",
    "A young, multidisciplinary technology and business solutions company based in New Delhi.",
  ],
  ["What we believe", "Technology becomes meaningful when it solves something real."],
  [
    "How we think",
    "Understand the problem first. Choose tools second. Build honestly, then improve.",
  ],
  [
    "What we explore",
    "AI, data, software, automation, IoT — and the future technologies just beyond them.",
  ],
  [
    "Where we are going",
    "Toward an ecosystem where different ideas, disciplines and people build useful things together.",
  ],
];

function Page() {
  return (
    <main>
      <PageHero
        visual={<AboutVisual />}
        eyebrow="About ZYQO"
        title={
          <>
            Meet the
            <br />
            <em className="text-primary">founder.</em>
          </>
        }
        intro={COMPANY.support}
      />
      <section className="pb-24 pt-8 sm:pb-32">
        <div className="container-z grid items-center gap-10 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-16">
          <Reveal>
            <div className="founder-panel relative grid aspect-[4/4.4] w-full max-w-lg place-items-center overflow-hidden border border-border">
              <span className="founder-panel-coordinate founder-coordinate-top">
                ZYQO / LEADERSHIP
              </span>
              <div className="founder-monogram" aria-hidden="true">
                CA
              </div>
              <div className="founder-panel-caption">
                <span className="founder-caption-mark" aria-hidden="true" />
                <span>
                  {COMPANY.founder}
                  <small>{COMPANY.role}</small>
                </span>
              </div>
              <span className="founder-panel-coordinate founder-coordinate-bottom">
                NEW DELHI · INDIA
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-teal">{COMPANY.role}</p>
            <h2 className="mt-3 text-[clamp(2.4rem,5vw,4rem)] font-medium tracking-[-.055em]">
              {COMPANY.founder}
            </h2>
            <blockquote className="mt-8 border-l border-primary pl-6 font-display text-xl leading-relaxed font-normal text-foreground/85 sm:text-2xl">
              “ZYQO begins with a simple belief: technology becomes meaningful when it solves
              something real. I want ZYQO to grow beyond a single technology or a single industry —
              into a place where different ideas, disciplines and people can come together to build
              useful things.”
            </blockquote>
          </Reveal>
        </div>
      </section>
      <section className="bg-paper py-20 text-paper-foreground sm:py-28">
        <div className="container-z">
          <Reveal>
            <p className="eyebrow text-teal">What guides us</p>
          </Reveal>
          <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
            {BLOCKS.map(([title, description], index) => (
              <Reveal
                as="li"
                key={title}
                delay={index * 60}
                className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-t border-paper-border py-8"
              >
                <span className="text-xs text-paper-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-medium">{title}</h3>
                  <p className="mt-2 leading-relaxed text-paper-muted">{description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={220} className="mt-8">
            <GlassButton to="/contact" variant="ink">
              Talk to ZYQO
            </GlassButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
