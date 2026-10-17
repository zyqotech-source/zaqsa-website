import { createFileRoute } from "@tanstack/react-router";
import { Timeline } from "@/components/site/IdeaBuilder";
import { Chip, GlassButton, PageHero, Reveal, SectionHead } from "@/components/site/primitives";
import { CIVIC, CONSULTING, PRODUCTS } from "@/lib/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/solutions")({
  head: () =>
    seo(
      "Solutions — Consulting, Civic Technology & Products | ZYQO",
      "Technology and business consulting, neutral civic technology, the ZYQO customer journey and our upcoming product ecosystem.",
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
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Thinking partner.
            <br />
            <em className="text-primary">Building partner.</em>
          </>
        }
        intro="Before we write code, we help you think clearly. Strategy, planning and an honest journey from idea to launch."
      />

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
            title="Explore what we are building."
            intro="Product ecosystem coming soon."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p, index) => (
              <Reveal
                key={p}
                delay={index * 70}
                className="platform-card flex min-h-24 items-end justify-between gap-3 rounded-2xl border border-border p-5"
              >
                <span className="text-lg font-light">{p}</span>
                <span className="eyebrow shrink-0 text-[0.6rem] text-muted-foreground">Soon</span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={180} className="mt-14">
            <GlassButton to="/contact">Start the conversation</GlassButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
