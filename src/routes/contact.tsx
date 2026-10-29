import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/primitives";
import { Check } from "lucide-react";
import { Photo } from "@/components/site/Photo";
import { ContactHero } from "@/components/site/heroes";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo(
      "Contact ZAQSA — Start the Conversation",
      "Tell ZAQSA about the problem, idea or possibility you have in mind. Based in Mahavir Enclave, New Delhi.",
    ),
  component: Page,
});

const NEXT = [
  ["Tell us what you need", "Fill the short form. The more you share, the better the first call."],
  [
    "We read it carefully",
    "Someone from the team reads your request. No ticket numbers, no scripts.",
  ],
  ["We get back to you", "A reply by email or phone to fix a time for your consultation."],
] as const;

function Page() {
  return (
    <main>
      <ContactHero />
      <section className="cx-body">
        <div className="container-z grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <Reveal>
            <aside className="cx-side">
              <p className="eyebrow text-primary">What happens next</p>
              <ol className="cx-steps">
                {NEXT.map(([title, text], index) => (
                  <li key={title}>
                    <span className="cx-step-no">{index + 1}</span>
                    <span>
                      <strong>{title}</strong>
                      {text}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="contact-photo">
                <Photo slot="contact-team" ratio="4 / 3" />
              </div>
              <ul className="cx-promises">
                <li>
                  <Check size={16} /> Free first consultation
                </li>
                <li>
                  <Check size={16} /> Plain language, no jargon
                </li>
                <li>
                  <Check size={16} /> Your details are used only to reply
                </li>
              </ul>
              <p className="font-hand text-3xl text-primary">
                Every good thing starts as a conversation.
              </p>
            </aside>
          </Reveal>
          <Reveal delay={120} className="contact-form-reveal">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
