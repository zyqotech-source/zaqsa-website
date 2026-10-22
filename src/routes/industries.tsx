import { createFileRoute } from "@tanstack/react-router";
import { GlassButton, PageHero, Reveal } from "@/components/site/primitives";
import { IndustryAccordion } from "@/components/site/IndustryAccordion";
import { INDUSTRIES } from "@/lib/content";
import { seo } from "@/lib/seo";
import { IndustriesVisual } from "@/components/site/hero-visuals";

export const Route = createFileRoute("/industries")({
  head: () =>
    seo(
      "Industries — Agriculture to Technology | ZYQO",
      "Industries ZYQO can explore and build for: agriculture, healthcare, education, finance, retail, logistics, manufacturing, real estate and more.",
    ),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero
        visual={<IndustriesVisual />}
        eyebrow="Industries"
        title={
          <>
            Different industries.
            <br />
            <em className="text-primary">Same curiosity.</em>
          </>
        }
        intro="Tap any industry to see how we think about it, where we can help, and what the work could look like."
      />
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
