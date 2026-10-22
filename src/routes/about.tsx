import { createFileRoute } from "@tanstack/react-router";
import { GlassButton, Reveal } from "@/components/site/primitives";
import { COMPANY } from "@/lib/content";
import { AboutHero } from "@/components/site/heroes";
import { seo } from "@/lib/seo";

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
      <AboutHero />
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
