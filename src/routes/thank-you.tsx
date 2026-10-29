import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Mail, MessageSquareText, PhoneCall } from "lucide-react";
import { COMPANY } from "@/lib/content";
import { LogoMark } from "@/components/site/LogoMark";
import { THANK_YOU_KEY } from "@/components/site/ContactForm";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank you | ZAQSA" },
      { name: "description", content: "Your consultation request is on its way to ZAQSA." },
      // A confirmation page is not something people should land on from search.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Page,
});

const STEPS = [
  {
    Icon: Mail,
    title: "Send the email",
    text: "Your email app opened with your message ready. Press Send if you have not yet.",
  },
  {
    Icon: MessageSquareText,
    title: "We read your request",
    text: "Our team looks at what you need and who it is for, so the first call is useful.",
  },
  {
    Icon: PhoneCall,
    title: "We get in touch",
    text: "We reply by email or phone to fix a time for your consultation.",
  },
] as const;

function Page() {
  // The name comes from this browser tab only; nothing personal is put in the address.
  const [details, setDetails] = useState<{ name?: string; need?: string } | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(THANK_YOU_KEY);
      if (raw) setDetails(JSON.parse(raw) as { name?: string; need?: string });
    } catch {
      /* private mode or blocked storage: the generic message is fine */
    }
  }, []);

  const firstName = details?.name?.split(/\s+/)[0];

  return (
    <main className="thanks">
      <div className="thanks-bg" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="container-z thanks-inner">
        <div className="thanks-badge" aria-hidden="true">
          <LogoMark className="thanks-mark" />
          <span className="thanks-check">
            <Check size={22} strokeWidth={3} />
          </span>
        </div>

        <p className="eyebrow text-primary">Consultation request</p>
        <h1>{firstName ? `Thank you, ${firstName}.` : "Thank you."}</h1>
        <p className="thanks-lead">
          {details?.need ? (
            <>
              Your request about <strong>{details.need.toLowerCase()}</strong> is ready to go.{" "}
            </>
          ) : null}
          Press <strong>Send</strong> in your email app and it reaches our team. We will come back
          to you to set up your consultation.
        </p>

        <ol className="thanks-steps">
          {STEPS.map(({ Icon, title, text }, index) => (
            <li key={title} style={{ "--i": index } as React.CSSProperties}>
              <span className="thanks-step-icon">
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <h2>{title}</h2>
              <p>{text}</p>
            </li>
          ))}
        </ol>

        <div className="thanks-actions">
          <Link to="/" className="form-submit">
            Back to home <ArrowUpRight size={16} />
          </Link>
          <Link to="/services" className="thanks-secondary">
            See our services
          </Link>
        </div>

        <p className="thanks-note">
          Email app did not open? Write to <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>{" "}
          or call <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a>.
        </p>
      </div>
    </main>
  );
}
