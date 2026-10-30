import { createFileRoute } from "@tanstack/react-router";
import { GlassButton, Reveal } from "@/components/site/primitives";
import { IndustryAccordion } from "@/components/site/IndustryAccordion";
import { INDUSTRIES, WHO_WE_SERVE } from "@/lib/content";
import { IndustriesHero } from "@/components/site/heroes";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/industries")({
  head: () =>
    seo(
      "Industries — Agriculture to Technology | ZAQSA",
      "Industries ZAQSA can explore and build for: agriculture, healthcare, education, finance, retail, logistics, manufacturing, real estate and more.",
    ),
  component: Page,
});

function Page() {
  return (
    <main>
      <IndustriesHero />
      <section className="pb-20">
        <div className="container-z">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-teal">Who we serve</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-medium tracking-[-.02em]">
              The people we build for most.
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {WHO_WE_SERVE.map((group, index) => (
              <Reveal
                as="li"
                key={group.name}
                delay={index * 80}
                className="rounded-2xl border border-border p-6"
              >
                <h3 className="text-xl font-semibold">{group.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{group.need}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.who.map((w) => (
                    <li
                      key={w}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium"
                    >
                      {w}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="pb-28">
        <div className="container-z">
          <IndustryAccordion items={INDUSTRIES} defaultOpen={0} />
          <Reveal delay={180} className="mt-14">
            <GlassButton to="/contact">Bring your industry</GlassButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
