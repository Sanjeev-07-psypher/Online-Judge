const styles = {
  Easy: "text-ac border-ac/30 bg-ac/10",
  Medium: "text-tle border-tle/30 bg-tle/10",
  Hard: "text-re border-re/30 bg-re/10",
};

const DifficultyBadge = ({ difficulty }) => {
  return (
    <span
      className={`inline-block rounded border px-2.5 py-0.5 text-xs lowercase ${
        styles[difficulty] || "text-ink-dim border-line"
      }`}
    >
      {difficulty}
    </span>
  );
};

export default DifficultyBadge;
