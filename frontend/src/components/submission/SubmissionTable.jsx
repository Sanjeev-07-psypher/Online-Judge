import { useNavigate } from "react-router-dom";

import Panel from "../ui/Panel";
import VerdictBadge from "./VerdictBadge";

const SubmissionsTable = ({ submissions }) => {
  const navigate = useNavigate();

  return (
    <Panel
      title="submissions"
      meta={`${submissions.length} total`}
      bodyClassName="p-0"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              <th className="px-6 py-3 font-medium">Problem</th>
              <th className="px-6 py-3 font-medium">Lang</th>
              <th className="px-6 py-3 font-medium">Verdict</th>
              <th className="px-6 py-3 text-right font-medium">Time</th>
              <th className="px-6 py-3 text-right font-medium">Memory</th>
              <th className="px-6 py-3 text-right font-medium">Tests</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission) => (
              <tr
                key={submission._id}
                onClick={() =>
                  navigate(`/submissions/${submission._id}`)
                }
                className="cursor-pointer border-b border-line transition-colors last:border-b-0 hover:bg-raise"
              >
                <td className="px-6 py-4 font-medium text-ink">
                  {submission.problem?.title}
                </td>

                <td className="px-6 py-4 uppercase text-ink-dim">
                  {submission.language}
                </td>

                <td className="px-6 py-4">
                  <VerdictBadge verdict={submission.verdict} />
                </td>

                <td className="px-6 py-4 text-right tabular-nums text-ink-dim">
                  {submission.executionTime != null
                    ? `${submission.executionTime}ms`
                    : "—"}
                </td>

                <td className="px-6 py-4 text-right tabular-nums text-ink-dim">
                  {submission.memoryUsed != null
                    ? `${submission.memoryUsed}mb`
                    : "—"}
                </td>

                <td className="px-6 py-4 text-right tabular-nums text-ink-dim">
                  {submission.passedTestCases}/
                  {submission.totalTestCases}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
};

export default SubmissionsTable;
