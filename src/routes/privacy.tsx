import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Reveal } from "@/components/site/primitives";
import { COMPANY } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy | ZAQSA", "How ZAQSA handles the information you share with us."),
  component: () => (
    <main>
      <PageHero
        eyebrow="Privacy"
        title="Privacy"
        intro="This website does not store your contact form details. Submitting the form opens your own email app so you decide what to send."
      />
      <section className="container-z max-w-3xl pb-28 text-muted-foreground">
        <Reveal>
          <p>
            Information you email us is used only to reply to your enquiry. To request deletion,
            write to {COMPANY.email}.
          </p>
        </Reveal>
      </section>
    </main>
  ),
});
