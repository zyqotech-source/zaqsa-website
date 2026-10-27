import { createFileRoute } from "@tanstack/react-router";
import { GlassButton, Reveal } from "@/components/site/primitives";
import { IndustryAccordion } from "@/components/site/IndustryAccordion";
import { INDUSTRIES } from "@/lib/content";
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
