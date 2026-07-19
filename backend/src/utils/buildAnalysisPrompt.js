const buildAnalysisPrompt = ({
    verdict,
    language,
    code,
    executionTime,
    memoryUsed,
    estimatedComplexity,
    optimizedComplexity,
    optimizationHints,
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

Optimization Hints:
${optimizationHints.join("\n")}

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
  "optimizedComplexity": "",
  "optimizationHints": []
}

Rules:

1. Return JSON only.
2. No markdown.
3. No code fences.
4. suggestions must be an array.
5. optimizationHints must be an array.
6. Explain why the estimated complexity was detected.
7. Explain whether a better complexity is realistically achievable.
8. If verdict is Accepted, discuss optimization opportunities and code quality.
9. If verdict is Wrong Answer, focus on logical mistakes and edge cases.
10. If verdict is Runtime Error, explain possible crash causes.
11. If verdict is Compilation Error, explain compilation issues.
12. If verdict is Time Limit Exceeded, focus heavily on complexity improvements.
13. Use the provided optimization hints when generating feedback.
14. Keep explanations concise but useful.
`;
};

export default buildAnalysisPrompt;