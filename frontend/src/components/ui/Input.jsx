const Input = ({ label, error, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-ink-dim">
          {label}
        </label>
      )}

      <input
        {...props}
        className="
          w-full
          rounded
          border
          border-line
          bg-raise
          px-4
          py-3
          text-ink
          outline-none
          transition-colors
          placeholder:text-ink-faint
          focus:border-amber
        "
      />

      {error && (
        <p className="mt-1 text-sm text-re">{error}</p>
      )}
    </div>
  );
};

export default Input;
