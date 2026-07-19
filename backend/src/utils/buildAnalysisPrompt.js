const buildAnalysisPrompt = ({
    verdict,
    language,
    code,
    executionTime,
    memoryUsed,
    estimatedComplexity,
    optimizedComplexity,
}) => {
    return `
You are an expert competitive programming mentor.

Analyze the following submission.

Verdict: ${verdict}
Language: ${language}
Execution Time: ${executionTime ?? "N/A"} ms
Memory Used: ${memoryUsed ?? "N/A"} MB

Estimated Time Complexity:
${estimatedComplexity}

Suggested Better Complexity:
${optimizedComplexity}

Code:
${code}

Return ONLY valid JSON.

{
  "summary": "",
  "issue": "",
  "explanation": "",
  "suggestions": [],
  "complexityFeedback": "",
  "estimatedComplexity": "",
  "optimizedComplexity": ""
}

Rules:

1. Return JSON only.
2. No markdown.
3. No code fences.
4. suggestions must be array.
5. Explain why estimated complexity was detected.
6. Explain whether better complexity is possible.
7. If verdict is Accepted, discuss optimization opportunities.
8. If verdict is Wrong Answer, focus on logic mistakes.
9. If verdict is Runtime Error, explain crash causes.
10. If verdict is Compilation Error, explain compile issues.
11. If verdict is Time Limit Exceeded, focus heavily on complexity improvements.
`;
};

export default buildAnalysisPrompt;