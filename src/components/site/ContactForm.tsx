import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { COMPANY, INDUSTRIES, NEEDS } from "@/lib/content";
import { contactSchema as schema } from "@/lib/contact-schema";

/** Session key the thank-you page reads, so no personal details travel in the address. */
export const THANK_YOU_KEY = "zaqsa-thank-you";

function FieldError({ field, message }: { field: string; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={`${field}-error`} className="mt-1.5 text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

/** Sends JSON to one endpoint and reports whether it was accepted. Never throws. */
async function post(url: string, body: unknown) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const reply = (await response.json().catch(() => ({}))) as { success?: unknown };
    return response.ok && String(reply.success) !== "false";
  } catch {
    return false;
  }
}

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fallback, setFallback] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const navigate = useNavigate();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => (nextErrors[String(issue.path[0])] = issue.message));
      setErrors(nextErrors);
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
    const subject = `New consultation request: ${values.need} — ${values.name}`;

    // Requests are delivered straight to the company inbox, no email app needed.
    // A hidden field that only bots fill in is dropped silently.
    if (data["website"]) {
      void navigate({ to: "/thank-you" });
      return;
    }
    setStatus("sending");
    try {
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone ?? "",
        company: values.company ?? "",
        need: values.need,
        industry: values.industry ?? "",
        message: values.message,
      };
      // Our own server route first. If it is not set up or is down, a hosted form service
      // is tried before the visitor is asked to use their email app.
      const delivered =
        (await post("/api/contact", payload)) ||
        (await post(`https://formsubmit.co/ajax/${COMPANY.email}`, {
          ...payload,
          _subject: subject,
          _template: "table",
          _captcha: "false",
        }));
      if (!delivered) throw new Error("Delivery failed");
    } catch {
      // Network or service problem: keep what they typed and offer the email app instead.
      setStatus("failed");
      setFallback(
        `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      );
      return;
    }
    setStatus("idle");
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
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="sm:col-span-2">
        <p className="eyebrow text-teal">Tell us what you have in mind</p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">
          A clear next step starts here.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Share a little context. Your request goes straight to our team and we reply by email or
          phone.
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
        <button type="submit" className="form-submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request a consultation"} <span aria-hidden>↗</span>
        </button>
        {status === "failed" && (
          <p className="text-sm text-destructive" role="alert">
            We could not send this just now. Your details are still here, so please try again, or{" "}
            <a className="underline" href={fallback}>
              send it from your email app
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
