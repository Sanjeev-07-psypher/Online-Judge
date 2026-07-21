import Card from "../ui/Card";
import VerdictBadge from "./VerdictBadge";

const SubmissionResult = ({
  submission,
}) => {
  if (!submission) return null;

  return (
    <Card>

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Submission Result
        </h2>

        <VerdictBadge
          verdict={submission.verdict}
        />

      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div>
          <p className="text-zinc-500">
            Status
          </p>

          <h3 className="mt-1 text-lg">
            {submission.status}
          </h3>
        </div>

        <div>
          <p className="text-zinc-500">
            Test Cases
          </p>

          <h3 className="mt-1 text-lg">
            {submission.passedTestCases}/
            {submission.totalTestCases}
          </h3>
        </div>

        <div>
          <p className="text-zinc-500">
            Execution Time
          </p>

          <h3 className="mt-1 text-lg">
            {submission.executionTime ??
              "-"}{" "}
            ms
          </h3>
        </div>

        <div>
          <p className="text-zinc-500">
            Memory Used
          </p>

          <h3 className="mt-1 text-lg">
            {submission.memoryUsed ??
              "-"}{" "}
            MB
          </h3>
        </div>

      </div>

    </Card>
  );
};

export default SubmissionResult;