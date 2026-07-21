const TopThreePodium = ({ leaderboard }) => {
  const topThree = leaderboard?.slice(0, 3) || [];

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {topThree.map((user) => (
        <div
          key={user.userId}
          className="rounded-md border border-line bg-panel p-8 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded border border-amber/40 bg-amber/10 text-xl font-bold text-amber glow">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <h3 className="mt-4 font-mono text-lg font-semibold text-ink">
            {user.username}
          </h3>

          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            rank #{user.rank}
          </p>

          <p className="mt-5 text-3xl font-bold tabular-nums text-amber">
            {user.solvedProblems}
          </p>

          <p className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            problems solved
          </p>
        </div>
      ))}
    </div>
  );
};

export default TopThreePodium;
