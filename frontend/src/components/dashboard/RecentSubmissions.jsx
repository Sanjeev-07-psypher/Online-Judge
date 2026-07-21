import { Link } from "react-router-dom";

import Panel from "../ui/Panel";
import VerdictBadge from "../submission/VerdictBadge";

const RecentSubmissions = ({ submissions = [] }) => {
  return (
    <Panel title="recent submissions" bodyClassName="p-0">
      {submissions.length === 0 ? (
        <p className="p-6 text-ink-dim">No submissions yet.</p>
      ) : (
        <div>
          {submissions.map((submission) => (
            <Link
              key={submission._id}
              to={`/submissions/${submission._id}`}
              className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 transition-colors last:border-b-0 hover:bg-raise"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">
                  {submission.problem?.title || "—"}
                </p>

                <p className="mt-1 text-xs uppercase tracking-wider text-ink-faint">
                  {submission.language}
                </p>
              </div>

              <VerdictBadge verdict={submission.verdict} />
            </Link>
          ))}
        </div>
      )}
    </Panel>
  );
};

export default RecentSubmissions;
