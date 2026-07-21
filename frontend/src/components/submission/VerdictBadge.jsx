const verdictMap = {
  Accepted: { code: "AC", cls: "text-ac border-ac/30 bg-ac/10" },
  "Wrong Answer": { code: "WA", cls: "text-wa border-wa/30 bg-wa/10" },
  "Runtime Error": { code: "RE", cls: "text-re border-re/30 bg-re/10" },
  "Compilation Error": {
    code: "CE",
    cls: "text-ce border-ce/30 bg-ce/10",
  },
  "Time Limit Exceeded": {
    code: "TLE",
    cls: "text-tle border-tle/30 bg-tle/10",
  },
  Pending: { code: "…", cls: "text-ink-dim border-line bg-raise" },
  Running: { code: "··", cls: "text-amber border-amber/30 bg-amber/10" },
};

const VerdictBadge = ({ verdict }) => {
  const v = verdictMap[verdict] || verdictMap.Pending;

  return (
    <span
      title={verdict}
      className={`inline-flex items-center rounded border px-2.5 py-1 text-xs font-bold tracking-wide ${v.cls}`}
    >
      {v.code}
    </span>
  );
};

export default VerdictBadge;
