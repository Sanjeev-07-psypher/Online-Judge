import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true,
        },

        language: {
            type: String,
            enum: ["cpp", "java", "python"],
            required: true,
        },

        code: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Running", "Completed"],
            default: "Pending",
        },

        verdict: {
            type: String,
            enum: [
                "Pending",
                "Accepted",
                "Wrong Answer",
                "Compilation Error",
                "Runtime Error",
                "Time Limit Exceeded",
            ],
            default: "Pending",
        },

        executionTime: {
            type: Number,
            default: null,
        },

        memoryUsed: {
            type: Number,
            default: null,
        },

        passedTestCases: {
            type: Number,
            default: 0,
        },

        totalTestCases: {
            type: Number,
            default: 0,
        },
        aiAnalysis: {
            type: {
                summary: String,
                issue: String,
                explanation: String,
                suggestions: [String],
                complexityFeedback: String,
                estimatedComplexity: String,
                optimizedComplexity: String,
                optimizationHints: [String],
            },
            default: null,
        },

        aiAnalysisStatus: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Completed",
                "Failed",
            ],
            default: "Pending",
        },

        estimatedComplexity: {
            type: String,
            default: null,
        },

        optimizedComplexity: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Leaderboard indexes

submissionSchema.index({
    verdict: 1,
});

submissionSchema.index({
    user: 1,
    problem: 1,
    verdict: 1,
});

const Submission = mongoose.model(
    "Submission",
    submissionSchema
);

export default Submission;