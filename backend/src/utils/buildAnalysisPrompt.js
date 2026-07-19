const buildAnalysisPrompt = ({
    verdict,
    language,
    code,
    executionTime,
    memoryUsed,
}) => {
    return `
You are an expert competitive programming mentor.

Analyze the following submission.

Verdict: ${verdict}
Language: ${language}
Execution Time: ${executionTime ?? "N/A"} ms
Memory Used: ${memoryUsed ?? "N/A"} MB

Code:
${code}

Return ONLY valid JSON.

{
  "summary": "short summary",
  "issue": "main issue",
  "explanation": "detailed explanation",
  "suggestions": [
    "suggestion 1",
    "suggestion 2",
    "suggestion 3"
  ],
  "complexityFeedback": "time complexity feedback"
}

Rules:

1. Return JSON only.
2. No markdown.
3. No code fences.
4. suggestions must be an array.
5. If verdict is Accepted:
   - praise correctness
   - discuss possible optimizations.
6. If verdict is Wrong Answer:
   - identify likely logical mistakes.
7. If verdict is Runtime Error:
   - explain possible crash reasons.
8. If verdict is Compilation Error:
   - explain compilation issues.
9. If verdict is Time Limit Exceeded:
   - explain performance bottlenecks.
`;
};

export default buildAnalysisPrompt;