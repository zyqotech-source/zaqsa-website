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
        intro="When you send the contact form, your details are emailed to our team so we can reply. This website does not keep a database of them."
      />
      <section className="container-z max-w-3xl pb-28 text-muted-foreground">
        <Reveal>
          <p>
            Information you send us is used only to reply to your enquiry. The form is delivered by
            email through a form-delivery service, which passes it to us. To request deletion, write
            to {COMPANY.email}.
          </p>
        </Reveal>
      </section>
    </main>
  ),
});
