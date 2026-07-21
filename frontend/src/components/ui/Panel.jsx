/*
  Titled terminal panel — the signature frame from the mockup:
  a title bar with a ▍ marker + uppercase label + faux window dots, over a body.
*/
const Panel = ({
  title,
  meta,
  actions,
  children,
  className = "",
  bodyClassName = "p-6",
}) => {
  return (
    <div
      className={`overflow-hidden rounded-md border border-line bg-panel ${className}`}
    >
      {title && (
        <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-xs uppercase tracking-[0.1em] text-ink-dim">
          <span className="text-amber">▍</span>
          <span>{title}</span>
          {meta && <span className="text-ink-faint">— {meta}</span>}

          <span className="ml-auto flex items-center gap-3">
            {actions}
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-line-hi" />
              <span className="h-2.5 w-2.5 rounded-full border border-line-hi" />
              <span className="h-2.5 w-2.5 rounded-full border border-line-hi" />
            </span>
          </span>
        </div>
      )}

      <div className={bodyClassName}>{children}</div>
    </div>
  );
};

export default Panel;
