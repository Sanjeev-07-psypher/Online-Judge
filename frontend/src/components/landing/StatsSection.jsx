const stats = [
  { value: "10K+", label: "Submissions" },
  { value: "500+", label: "Problems" },
  { value: "95%", label: "Judge Accuracy" },
  { value: "24/7", label: "Availability" },
];

const StatsSection = () => {
  return (
    <section className="border-y border-line bg-panel">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-md border border-line bg-bg p-6"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                {stat.label}
              </p>

              <p className="mt-3 text-4xl font-bold text-amber">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
