import { createFileRoute } from "@tanstack/react-router";
import { Timeline } from "@/components/site/IdeaBuilder";
import { Chip, GlassButton, Reveal, SectionHead } from "@/components/site/primitives";
import { ALSO_BUILT, CIVIC, CONSULTING, PRODUCT_LINES, SHARED_FOUNDATION } from "@/lib/content";
import { SolutionsHero } from "@/components/site/heroes";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/solutions")({
  head: () =>
    seo(
      "Solutions — Consulting, Civic Technology & Products | ZAQSA",
      "Technology and business consulting, neutral civic technology, the ZAQSA customer journey and our upcoming product ecosystem.",
    ),
  component: Page,
});

const JOURNEY = [
  "Discover",
  "Understand",
  "Discuss",
  "Plan",
  "Build",
  "Test",
  "Improve",
  "Deploy",
  "Support",
  "Evolve",
];
const PLATFORM = [
  "Consultation",
  "Requirement Submission",
  "Project Discussion",
  "Progress Tracking",
  "Customer Dashboard",
  "Support Tickets",
  "Documents",
  "Notifications",
  "Feedback",
  "Future Improvements",
];

function Page() {
  return (
    <main>
      <SolutionsHero />

      <section className="pb-24">
        <div className="container-z grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <SectionHead
            eyebrow="Consulting"
            title="Thinking partner"
            intro="For founders, teams and organisations who need clarity before commitment."
          />
          <Reveal className="flex flex-wrap content-start gap-2">
            {CONSULTING.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 text-paper-foreground">
        <div className="container-z">
          <SectionHead light eyebrow="Customer journey" title="Ten steps, no surprises." />
          <div className="mt-16">
            <Timeline steps={JOURNEY} />
          </div>
          <div className="mt-20 glass-paper rounded-3xl p-7 sm:p-10">
            <p className="eyebrow text-paper-muted">Customer platform — planned, not yet live</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {PLATFORM.map((p) => (
                <Chip key={p} light>
                  {p}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-z grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <SectionHead
            eyebrow="Civic & election technology"
            title="Neutral tools for public information."
            intro="Operational and informational systems for administrators, coordinators and public bodies — built with compliance in mind."
          />
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {CIVIC.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
            <div className="glass mt-8 rounded-2xl p-6 text-sm text-muted-foreground">
              <p className="eyebrow text-primary">Our boundaries</p>
              <p className="mt-3">
                No voter manipulation. No discriminatory targeting. No deceptive messaging. No
                political persuasion. No microtargeting.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-z">
          <SectionHead
            eyebrow="Products & platforms"
            title="Software we are building."
            intro="Ready-to-run software for the businesses we work with most, built on one shared foundation."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_LINES.map((p, index) => (
              <Reveal
                key={p.name}
                delay={index * 60}
                className="platform-card flex min-h-28 flex-col justify-between gap-3 rounded-2xl border border-border p-5"
              >
                <span>
                  <span className="block text-lg font-medium">{p.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{p.line}</span>
                </span>
                <span className="eyebrow text-[0.6rem] text-primary">In development</span>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <p className="eyebrow text-teal">One foundation under every product</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SHARED_FOUNDATION.map((f) => (
                <Chip key={f}>{f}</Chip>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-14">
            <p className="eyebrow text-teal">Also built to order</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ALSO_BUILT.map((a) => (
                <li key={a.name} className="rounded-2xl border border-border p-5">
                  <strong className="block font-medium">{a.name}</strong>
                  <span className="mt-1 block text-sm text-muted-foreground">{a.line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={180} className="mt-14">
            <GlassButton to="/contact">Start the conversation</GlassButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
