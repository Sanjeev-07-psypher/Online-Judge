import { Sparkles } from "lucide-react";

import Panel from "../ui/Panel";

const insights = [
  {
    tone: "border-amber/30 bg-amber/5",
    text: "Most recent solutions trend O(n²). Consider hashing to reach O(n).",
  },
  {
    tone: "border-ac/30 bg-ac/5",
    text: "Strong performance on array and binary-search problems.",
  },
  {
    tone: "border-tle/30 bg-tle/5",
    text: "Acceptance rate improved 12% this month.",
  },
];

const AIInsights = () => {
  return (
    <Panel
      title="ai insights"
      actions={<Sparkles size={13} className="text-amber" />}
    >
      <div className="space-y-3">
        {insights.map((item, index) => (
          <div
            key={index}
            className={`rounded border-l-2 px-4 py-3 text-sm leading-relaxed text-ink-dim ${item.tone}`}
          >
            {item.text}
          </div>
        ))}
      </div>
    </Panel>
  );
};

export default AIInsights;
