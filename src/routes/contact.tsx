import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/primitives";
import { COMPANY } from "@/lib/content";
import { Photo } from "@/components/site/Photo";
import { ContactHero } from "@/components/site/heroes";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo(
      "Contact ZYQO — Start the Conversation",
      "Tell ZYQO about the problem, idea or possibility you have in mind. Based in Mahavir Enclave, New Delhi.",
    ),
  component: Page,
});

function Page() {
  return (
    <main>
      <ContactHero />
      <section className="pb-28">
        <div className="container-z grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)]">
          <Reveal className="contact-form-reveal">
            <ContactForm />
          </Reveal>
          <Reveal delay={140}>
            <aside className="min-w-0 space-y-6">
              <div className="contact-photo">
                <Photo slot="contact-team" ratio="4 / 3" />
              </div>
              <div className="glass rounded-3xl p-7">
                <p className="eyebrow text-primary">Direct</p>
                <p className="mt-4 text-lg">{COMPANY.founder}</p>
                <p className="text-sm text-muted-foreground">{COMPANY.role}</p>
                <div className="mt-6 space-y-3 text-sm">
                  <p>
                    <a
                      className="hover:text-primary"
                      href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    >
                      {COMPANY.phone}
                    </a>
                  </p>
                  <p className="break-all">
                    <a className="hover:text-primary" href={`mailto:${COMPANY.email}`}>
                      {COMPANY.email}
                    </a>
                  </p>
                  <p className="text-muted-foreground">{COMPANY.address}</p>
                </div>
              </div>
              <p className="font-hand text-3xl text-primary">
                Every good thing starts as a conversation.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
