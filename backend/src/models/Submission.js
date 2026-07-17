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
    },
    {
        timestamps: true,
    }
);

const Submission = mongoose.model(
    "Submission",
    submissionSchema
);

export default Submission;