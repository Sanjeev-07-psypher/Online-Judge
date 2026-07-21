const EmptyState = ({ title, description, icon, action }) => {
  return (
    <div
      className="
        flex
        min-h-[400px]
        flex-col
        items-center
        justify-center
        rounded-md
        border
        border-dashed
        border-zinc-800
        bg-panel
        p-12
        text-center
      "
    >
      {icon ? (
        <div className="mb-4 text-zinc-600">{icon}</div>
      ) : null}

      <h3 className="font-mono text-xl font-semibold text-white">
        {title}
      </h3>

      {description ? (
        <p className="mt-2 max-w-md text-sm text-zinc-500">
          {description}
        </p>
      ) : null}

      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
};

export default EmptyState;
