import Card from "../ui/Card";

const SubmissionCodeView = ({
  code,
}) => {
  return (
    <Card>

      <h2 className="mb-4 text-xl font-semibold">
        Submitted Code
      </h2>

      <pre
        className="
          overflow-x-auto
          rounded
          bg-zinc-950
          p-4
          text-sm
        "
      >
        <code>
          {code}
        </code>
      </pre>

    </Card>
  );
};

export default SubmissionCodeView;