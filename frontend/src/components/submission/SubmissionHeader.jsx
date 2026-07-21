import VerdictBadge from "./VerdictBadge";

const SubmissionHeader = ({
  submission,
}) => {
  return (
    <div
      className="
        rounded-md
        border
        border-zinc-800
        bg-panel
        p-6
      "
    >
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            {submission.problem?.title}
          </h1>

          <p className="mt-2 text-zinc-500">
            {submission.language.toUpperCase()}
          </p>
        </div>

        <VerdictBadge
          verdict={submission.verdict}
        />

      </div>
    </div>
  );
};

export default SubmissionHeader;