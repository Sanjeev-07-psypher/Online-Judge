import { Worker } from "bullmq";

import redisConnection from "../config/redis.js";

import Submission from "../models/Submission.js";

import analyzeSubmission from "../services/aiAnalysisService.js";

const aiAnalysisWorker = new Worker(
    "ai-analysis",

    async (job) => {
        const { submissionId } = job.data;

        console.log(
            `AI Analysis Job Started: ${submissionId}`
        );

        try {
            const submission =
                await Submission.findById(
                    submissionId
                );

            if (!submission) {
                throw new Error(
                    "Submission not found"
                );
            }

            submission.aiAnalysisStatus =
                "Processing";

            await submission.save();

            const analysis =
                await analyzeSubmission(
                    submissionId
                );

            submission.aiAnalysis =
                analysis;

            submission.aiAnalysisStatus =
                "Completed";

            await submission.save();

            console.log(
                `AI Analysis Job Completed: ${submissionId}`
            );
        } catch (error) {
            console.error(
                "AI Analysis Worker Error:",
                error
            );

            await Submission.findByIdAndUpdate(
                submissionId,
                {
                    aiAnalysisStatus:
                        "Failed",
                }
            );

            throw error;
        }
    },

    {
        connection: redisConnection,
    }
);

export default aiAnalysisWorker;