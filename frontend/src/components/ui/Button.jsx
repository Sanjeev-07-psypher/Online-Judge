import clsx from "clsx";

const variants = {
  primary:
    "bg-amber text-[#17130a] font-bold hover:bg-amber-hi",
  secondary:
    "bg-raise text-ink border border-line-hi hover:border-amber-dim",
  ghost:
    "text-ink-dim hover:bg-raise hover:text-ink",
  danger:
    "bg-wa text-white hover:opacity-90",
};

const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded px-4 py-2.5 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
