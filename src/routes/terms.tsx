import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Reveal } from "@/components/site/primitives";
import { COMPANY } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms | ZYQO", "Terms of use for the ZYQO website."),
  component: () => (
    <main>
      <PageHero
        eyebrow="Terms"
        title="Terms of use"
        intro="Content on this website describes the areas ZYQO works in and explores. It is not a contract or guarantee of specific results."
      />
      <section className="container-z max-w-3xl pb-28 text-muted-foreground">
        <Reveal>
          <p>
            Project scope, timelines and terms are agreed individually in writing. Questions:{" "}
            {COMPANY.email}.
          </p>
        </Reveal>
      </section>
    </main>
  ),
});
