const SubmissionMetrics = ({ submission }) => {
  if (!submission) {
    return null;
  }

  const metrics = [
    {
      label: "Execution Time",
      value:
        submission.executionTime != null
          ? `${submission.executionTime} ms`
          : "—",
    },
    {
      label: "Memory Used",
      value:
        submission.memoryUsed != null
          ? `${submission.memoryUsed} MB`
          : "—",
    },
    {
      label: "Test Cases",
      value: `${submission.passedTestCases ?? 0}/${
        submission.totalTestCases ?? 0
      }`,
    },
    {
      label: "Status",
      value: submission.status ?? "—",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="
            rounded-md
            border
            border-zinc-800
            bg-panel
            p-6
          "
        >
          <p className="text-sm text-zinc-400">
            {metric.label}
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SubmissionMetrics;
