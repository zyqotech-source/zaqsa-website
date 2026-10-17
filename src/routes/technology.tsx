import { createFileRoute } from "@tanstack/react-router";
import { Explorer } from "@/components/site/Explorer";
import { GlassButton, PageHero, Reveal } from "@/components/site/primitives";
import { TECHNOLOGY } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/technology")({
  head: () =>
    seo(
      "Technology — AI, Software, Web, Mobile, Data & Cloud | ZYQO",
      "Explore ZYQO's technology universe: AI, data, custom software, web development, mobile apps, cloud, IT networking and IoT.",
    ),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Technology universe"
        title={
          <>
            Eight disciplines.
            <br />
            <em className="text-primary">One way of thinking.</em>
          </>
        }
        intro="From AI agents to Wi-Fi networks, we choose technology by what the problem needs — not by what's fashionable."
      />
      <section className="pb-28">
        <div className="container-z">
          <Reveal>
            <Explorer groups={TECHNOLOGY} />
          </Reveal>
          <Reveal delay={180} className="mt-16">
            <GlassButton to="/contact">Start with an idea</GlassButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
