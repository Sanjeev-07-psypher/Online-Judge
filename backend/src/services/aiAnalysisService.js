import Submission from "../models/Submission.js";
import ai from "../config/gemini.js";
import buildAnalysisPrompt from "../utils/buildAnalysisPrompt.js";

const analyzeSubmission = async (submissionId) => {
    const submission = await Submission.findById(
        submissionId
    );

    if (!submission) {
        throw new Error("Submission not found");
    }

    const prompt = buildAnalysisPrompt({
        verdict: submission.verdict,
        language: submission.language,
        code: submission.code,
        executionTime: submission.executionTime,
        memoryUsed: submission.memoryUsed,
    });

    const response =
        await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
        });

    let text = response.text.trim();

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    let analysis;

    try {
        analysis = JSON.parse(text);
    } catch (error) {
        console.error(
            "Failed Gemini Response:",
            text
        );

        throw new Error(
            "Failed to parse AI response"
        );
    }

    return analysis;
};

export default analyzeSubmission;