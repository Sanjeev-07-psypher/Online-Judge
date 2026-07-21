import { Link } from "react-router-dom";

import DifficultyBadge from "../ui/DifficultyBadge";

const ProblemCard = ({ problem }) => {
  return (
    <Link
      to={`/problems/${problem._id}`}
      className="group block h-full rounded-md border border-line bg-panel p-6 transition-colors hover:border-amber-dim"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-lg font-semibold text-ink transition-colors group-hover:text-amber">
          {problem.title}
        </h3>

        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-dim">
        {problem.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {problem.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded border border-line px-2.5 py-1 text-xs text-ink-dim"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex gap-4 text-[11px] uppercase tracking-[0.14em] text-ink-faint">
        <span>{problem.timeLimit}s limit</span>
        <span>{problem.memoryLimit}mb</span>
      </div>
    </Link>
  );
};

export default ProblemCard;
