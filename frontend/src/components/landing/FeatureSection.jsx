import {
  ShieldCheck,
  Sparkles,
  Code2,
  Gauge,
  Trophy,
  History,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "sandboxed judging",
    desc: "Every submission compiles and runs in an isolated gcc:14 Docker container — memory-capped, network-off, time-limited.",
  },
  {
    icon: Sparkles,
    title: "ai code review",
    desc: "Gemini reads your accepted solution back to you: a summary, the complexity, and concrete optimization hints.",
  },
  {
    icon: Code2,
    title: "four languages",
    desc: "Ship in C++, C, Java, or Python in a real Monaco editor with per-language starter templates.",
  },
  {
    icon: Gauge,
    title: "honest verdicts",
    desc: "AC, WA, TLE, RE, CE — measured on real test cases, with execution time and passed-count.",
  },
  {
    icon: Trophy,
    title: "global leaderboard",
    desc: "Ranked by unique problems solved. Climb the board as you accept more.",
  },
  {
    icon: History,
    title: "full history",
    desc: "Every submission tracked with its verdict, timing, and AI feedback you can revisit anytime.",
  },
];

const FeatureSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">
        // features
      </p>

      <h2 className="mt-3 font-mono text-3xl font-bold md:text-4xl">
        Everything a judge should be.
      </h2>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-md border border-line bg-panel p-6 transition-colors hover:border-amber-dim"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded border border-amber/25 bg-amber/10 text-amber">
                <Icon size={20} />
              </div>

              <h3 className="mt-5 font-mono text-lg font-semibold text-ink">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureSection;
