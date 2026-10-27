import { createFileRoute } from "@tanstack/react-router";
import { FutureMap } from "@/components/site/FutureMap";
import { Reveal, SectionHead } from "@/components/site/primitives";
import { FUTURE, LAB } from "@/lib/content";
import { LabHero } from "@/components/site/heroes";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/lab")({
  head: () =>
    seo(
      "ZAQSA Lab — Experiments & Future Exploration",
      "Inside ZAQSA Lab: AI experiments, software and IoT prototypes, and research into robotics, spatial computing and other emerging technologies.",
    ),
  component: Page,
});

const MODES = ["Exploring", "Learning", "Researching", "Experimenting", "Imagining"];

function Page() {
  return (
    <main>
      <LabHero />
      <section className="pb-24">
        <div className="container-z">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LAB.map((l, i) => (
              <Reveal
                as="li"
                key={l}
                delay={i * 50}
                className="glass flex min-h-32 flex-col justify-between rounded-2xl p-6"
              >
                <span className="eyebrow text-[0.6rem] text-primary">Exploration in progress</span>
                <span className="text-xl font-light">{l}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="pb-24">
        <div className="container-z">
          <SectionHead
            eyebrow="Future exploration"
            title="Not services. Curiosities."
            intro="These are areas we are studying — not current commercial offerings."
          />
          <Reveal className="lab-modes mt-8 flex flex-wrap gap-x-6 gap-y-2 font-hand text-2xl text-primary">
            {MODES.map((m, index) => (
              <span className="lab-mode" key={m} style={{ animationDelay: `${index * 90}ms` }}>
                {m}
              </span>
            ))}
          </Reveal>
          <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {FUTURE.map((f, index) => (
              <Reveal
                as="li"
                key={f}
                delay={index * 70}
                className="future-topic border-t border-border py-6 font-display text-2xl font-light"
              >
                {f}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <FutureMap />
    </main>
  );
}
