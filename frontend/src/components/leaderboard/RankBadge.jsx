const RankBadge = ({ rank }) => {
  let style =
    "bg-zinc-800 text-zinc-300";

  if (rank === 1) {
    style =
      "bg-yellow-500/20 text-yellow-400";
  }

  if (rank === 2) {
    style =
      "bg-zinc-400/20 text-zinc-300";
  }

  if (rank === 3) {
    style =
      "bg-orange-500/20 text-orange-400";
  }

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-sm
        font-semibold
        ${style}
      `}
    >
      #{rank}
    </span>
  );
};

export default RankBadge;