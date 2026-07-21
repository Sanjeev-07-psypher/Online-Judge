import clsx from "clsx";

const variants = {
  success:
    "bg-green-500/10 text-green-400",
  warning:
    "bg-yellow-500/10 text-yellow-400",
  error:
    "bg-red-500/10 text-red-400",
  info:
    "bg-cyan-500/10 text-cyan-400",
};

const Badge = ({
  children,
  variant = "info",
}) => {
  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-medium",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
};

export default Badge;