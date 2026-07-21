const MetricCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="rounded-md border border-line bg-panel p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          {title}
        </p>

        {icon && <span className="text-ink-faint">{icon}</span>}
      </div>

      <p className="mt-4 text-4xl font-bold tabular-nums text-ink">
        {value}
      </p>

      {subtitle && (
        <p className="mt-2 text-xs text-ink-dim">{subtitle}</p>
      )}
    </div>
  );
};

export default MetricCard;
