import Panel from "../ui/Panel";

const LeaderboardTable = ({ leaderboard = [] }) => {
  return (
    <Panel title="leaderboard" meta="global ranking" bodyClassName="p-0">
      {/* header row */}
      <div className="grid grid-cols-[3.5rem_1fr_5rem_5rem] gap-x-4 border-b border-line px-6 py-3 text-[11px] uppercase tracking-[0.14em] text-ink-faint">
        <span>rank</span>
        <span>username</span>
        <span className="text-right">solved</span>
        <span className="text-right">acc.</span>
      </div>

      {leaderboard.map((user) => (
        <div
          key={user.userId}
          className="grid grid-cols-[3.5rem_1fr_5rem_5rem] items-center gap-x-4 border-b border-line px-6 py-4 transition-colors last:border-b-0 hover:bg-raise"
        >
          <span className="flex items-center gap-1.5 font-bold tabular-nums text-ink-dim">
            {user.rank <= 3 && <span className="text-amber">◆</span>}
            {String(user.rank).padStart(2, "0")}
          </span>

          <span className="truncate font-medium text-ink">
            {user.username}
          </span>

          <span className="text-right tabular-nums text-amber">
            {user.solvedProblems}
          </span>

          <span className="text-right tabular-nums text-ink-dim">
            {user.acceptedSubmissions}
          </span>
        </div>
      ))}
    </Panel>
  );
};

export default LeaderboardTable;
