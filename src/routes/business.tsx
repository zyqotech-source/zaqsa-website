import { createFileRoute } from "@tanstack/react-router";
import { Explorer } from "@/components/site/Explorer";
import { GlassButton, PageHero, Reveal } from "@/components/site/primitives";
import { BUSINESS } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/business")({
  head: () =>
    seo(
      "Business Solutions — CRM, E-commerce, HR & Education | ZYQO",
      "Business software by ZYQO: CRM, billing, inventory, e-commerce, HR, education management, digital marketing and workflow automation.",
    ),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Business"
        title={
          <>
            Software for the way
            <br />
            <em className="text-primary">you actually work.</em>
          </>
        }
        intro="CRM, billing, inventory, people, schools, marketing and paperwork — practical systems that remove friction from everyday operations."
      />
      <section className="pb-28">
        <div className="container-z">
          <Reveal>
            <Explorer groups={BUSINESS} />
          </Reveal>
          <Reveal delay={120} className="mt-8 max-w-2xl text-sm text-muted-foreground">
            Payroll and HR tools integrate with your existing data; legal or statutory compliance is
            scoped separately per project.
          </Reveal>
          <Reveal delay={220} className="mt-12">
            <GlassButton to="/contact">Discuss your business</GlassButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
