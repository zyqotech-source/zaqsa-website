import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { COMPANY, INDUSTRIES, NEEDS } from "@/lib/content";

/** Session key the thank-you page reads, so no personal details travel in the address. */
export const THANK_YOU_KEY = "zaqsa-thank-you";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[+\d\s()-]*$/, "Use digits only")
    .optional(),
  company: z.string().trim().max(120).optional(),
  need: z.string().min(1, "Choose what you need").default(""),
  industry: z.string().optional(),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000),
});

function FieldError({ field, message }: { field: string; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={`${field}-error`} className="mt-1.5 text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => (nextErrors[String(issue.path[0])] = issue.message));
      setErrors(nextErrors);
      setSent(false);
      return;
    }

    setErrors({});
    const values = result.data;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone ?? ""}`,
      `Company: ${values.company ?? ""}`,
      `Need: ${values.need}`,
      `Industry: ${values.industry ?? ""}`,
      "",
      values.message,
    ].join("\n");
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`New idea: ${values.need} — ${values.name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    try {
      window.sessionStorage.setItem(
        THANK_YOU_KEY,
        JSON.stringify({ name: values.name, need: values.need }),
      );
    } catch {
      /* storage blocked: the thank-you page falls back to a general message */
    }
    void navigate({ to: "/thank-you" });
  }

  const invalid = (field: string) =>
    errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {};

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="contact-form glass grid gap-x-5 gap-y-4 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <p className="eyebrow text-teal">Tell us what you have in mind</p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">
          A clear next step starts here.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Share a little context. Your email app will open with your message ready to send.
        </p>
      </div>

      <label className="block text-sm font-medium" htmlFor="contact-name">
        Name{" "}
        <span className="text-primary" aria-hidden="true">
          *
        </span>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          className="form-control"
          {...invalid("name")}
        />
        <FieldError field="name" message={errors["name"]} />
      </label>
      <label className="block text-sm font-medium" htmlFor="contact-email">
        Email{" "}
        <span className="text-primary" aria-hidden="true">
          *
        </span>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="form-control"
          {...invalid("email")}
        />
        <FieldError field="email" message={errors["email"]} />
      </label>
      <label className="block text-sm font-medium" htmlFor="contact-phone">
        Phone
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="form-control"
          {...invalid("phone")}
        />
        <FieldError field="phone" message={errors["phone"]} />
      </label>
      <label className="block text-sm font-medium" htmlFor="contact-company">
        Company / organization
        <input
          id="contact-company"
          name="company"
          autoComplete="organization"
          className="form-control"
          {...invalid("company")}
        />
        <FieldError field="company" message={errors["company"]} />
      </label>
      <label className="block text-sm font-medium" htmlFor="contact-need">
        What do you need?{" "}
        <span className="text-primary" aria-hidden="true">
          *
        </span>
        <select
          id="contact-need"
          name="need"
          defaultValue=""
          required
          className="form-control"
          {...invalid("need")}
        >
          <option value="" disabled>
            Choose one
          </option>
          {NEEDS.map((need) => (
            <option key={need}>{need}</option>
          ))}
        </select>
        <FieldError field="need" message={errors["need"]} />
      </label>
      <label className="block text-sm font-medium" htmlFor="contact-industry">
        Industry
        <select id="contact-industry" name="industry" defaultValue="" className="form-control">
          <option value="">Choose (optional)</option>
          {INDUSTRIES.map((industry) => (
            <option key={industry.name}>{industry.name}</option>
          ))}
          <option>Other</option>
        </select>
      </label>
      <label className="block text-sm font-medium sm:col-span-2" htmlFor="contact-message">
        Message{" "}
        <span className="text-primary" aria-hidden="true">
          *
        </span>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="form-control min-h-36 resize-y"
          placeholder="The problem, idea or possibility you have in mind…"
          {...invalid("message")}
        />
        <FieldError field="message" message={errors["message"]} />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-1 sm:col-span-2">
        <button type="submit" className="form-submit">
          Start the conversation <span aria-hidden>↗</span>
        </button>
        {sent && (
          <p className="text-sm text-muted-foreground" role="status">
            Your email app should open with the message ready to send.
          </p>
        )}
      </div>
    </form>
  );
}
