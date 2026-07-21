import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="rounded-md border border-line bg-panel p-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-amber">
          $ ./join.sh
        </p>

        <h2 className="mt-4 font-mono text-4xl font-bold">
          Start coding today.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-ink-dim">
          Create an account, pick a problem, and get your first verdict in
          under a minute.
        </p>

        <Link
          to="/register"
          className="mt-8 inline-flex items-center gap-2 rounded bg-amber px-6 py-3 font-bold text-[#17130a] transition-colors hover:bg-amber-hi"
        >
          ▸ create account
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
