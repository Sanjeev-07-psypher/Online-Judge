import { Link } from "react-router-dom";
import { ArrowRight, Terminal } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(242,168,29,0.10),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">

        {/* Left — thesis */}
        <div>
          <div className="inline-flex items-center gap-2 rounded border border-amber/25 bg-amber/10 px-3 py-1.5 text-xs uppercase tracking-[0.15em] text-amber">
            <Terminal size={14} />
            online judge · ai-reviewed
          </div>

          <h1 className="mt-7 font-mono text-5xl font-bold leading-[1.05] md:text-6xl">
            Practice.
            <br />
            <span className="text-amber glow">Compete.</span>
            <br />
            Improve.
          </h1>

          <p className="mt-7 max-w-md leading-relaxed text-ink-dim">
            Solve problems in a real sandbox, get an AI review of every
            accepted solution, and climb a global leaderboard — from a judge
            that feels like home: the terminal.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded bg-amber px-6 py-3 font-bold text-[#17130a] transition-colors hover:bg-amber-hi"
            >
              ▸ start solving
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/problems"
              className="inline-flex items-center justify-center rounded border border-line-hi px-6 py-3 text-ink transition-colors hover:border-amber-dim hover:bg-raise"
            >
              browse problems
            </Link>
          </div>
        </div>

        {/* Right — live submit transcript */}
        <div className="rounded-md border border-line bg-panel">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs uppercase tracking-wider text-ink-dim">
            <span className="text-amber">▍</span>
            judgex — submit
            <span className="ml-auto flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-line-hi" />
              <span className="h-2.5 w-2.5 rounded-full border border-line-hi" />
              <span className="h-2.5 w-2.5 rounded-full border border-line-hi" />
            </span>
          </div>

          <div className="space-y-1.5 p-5 text-sm">
            <p>
              <span className="text-amber">$</span> judgex submit two-sum.cpp{" "}
              <span className="text-ink-faint">--lang cpp</span>
            </p>
            <p className="text-ink-dim">→ queued · job #a4f21</p>
            <p className="text-ink-dim">→ compiling in gcc:14 sandbox…</p>
            <p className="text-ink-dim">→ running testcases [▇▇] 2/2</p>
            <p>
              <span className="font-bold text-ac">» AC</span>{" "}
              <span className="text-ink-dim">accepted · 2/2 · 871ms · 5.2mb</span>
            </p>
            <p className="text-ink-dim">→ ai review · O(n) · hashing</p>
            <p>
              <span className="text-amber">$</span>{" "}
              <span className="term-cursor" aria-hidden="true" />
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
