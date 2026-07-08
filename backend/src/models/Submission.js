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

        verdict: {
            type: String,
            enum: [
                "Pending",
                "Accepted",
                "Wrong Answer",
                "Runtime Error",
                "Time Limit Exceeded",
            ],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;