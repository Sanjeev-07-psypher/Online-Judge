import Card from "../ui/Card";

const AIAnalysisPanel = ({
  analysis,
  status,
}) => {
  return (
    <Card>

      <h2 className="mb-4 text-xl font-semibold">
        AI Analysis
      </h2>

      <div className="rounded bg-zinc-900 p-4">
        Status: {status}
      </div>

      {analysis && (
        <div className="mt-4 space-y-4">

          <div>
            <h3 className="font-semibold">
              Summary
            </h3>

            <p className="text-zinc-400">
              {analysis.summary}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Explanation
            </h3>

            <p className="text-zinc-400">
              {analysis.explanation}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Suggestions
            </h3>

            <ul className="list-disc pl-5 text-zinc-400">
              {analysis.suggestions?.map(
                (
                  suggestion,
                  index
                ) => (
                  <li key={index}>
                    {suggestion}
                  </li>
                )
              )}
            </ul>
          </div>

        </div>
      )}

    </Card>
  );
};

export default AIAnalysisPanel;