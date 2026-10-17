import futureImg from "@/assets/future.jpg";
import { Reveal } from "./primitives";

const STAGES = [
  { k: "Now", d: "Software, web, mobile, AI, data, cloud and business systems." },
  { k: "Exploring", d: "Deeper automation, AI agents and industry platforms." },
  { k: "Experimenting", d: "IoT prototypes, interface ideas and product concepts." },
  { k: "Future", d: "Robotics, spatial computing and what comes after." },
];

export function FutureMap() {
  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-40" aria-labelledby="future-h">
      <img src={futureImg} alt="Sunrise over misty mountain ridges with floating glass fragments" width={1920} height={912} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/55 to-background" />
      <div className="container-z">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-primary">Future map</p>
          <h2 id="future-h" className="mt-4 text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.02] font-light text-glow">The future is open to exploration.</h2>
          <p className="mt-5 max-w-xl text-muted-foreground">No promises we can't keep — just a clear view of where we work today and where our curiosity is heading.</p>
        </Reveal>
        <ol className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s, i) => (
            <Reveal as="li" key={s.k} delay={i * 120} className="glass rounded-2xl bg-background/30 p-6">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--glow)]" style={{ opacity: 1 - i * 0.2 }} />
                <span className="eyebrow text-foreground/60">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-2xl font-light">{s.k}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
