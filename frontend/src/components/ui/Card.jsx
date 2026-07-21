const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-md
        border
        border-zinc-800
        bg-panel
        p-6
        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;