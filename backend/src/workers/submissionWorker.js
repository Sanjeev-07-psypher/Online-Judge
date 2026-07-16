import { Worker } from "bullmq";

import redisConnection from "../config/redis.js";

import Submission from "../models/Submission.js";
import { judgeSubmission } from "../services/judgeService.js";

const worker = new Worker(
    "submissionQueue",

    async (job) => {
        const { submissionId } = job.data;

        console.log(
            `Processing Submission: ${submissionId}`
        );

        try {
            await Submission.findByIdAndUpdate(
                submissionId,
                {
                    status: "Running",
                }
            );

            // Uncomment for Bull Board testing of active, pending
            // await new Promise((resolve) =>
            //     setTimeout(resolve, 10000)
            // );

            await judgeSubmission(submissionId);

            await Submission.findByIdAndUpdate(
                submissionId,
                {
                    status: "Completed",
                }
            );

            console.log(
                `Submission ${submissionId} judged successfully`
            );
        } catch (error) {
            await Submission.findByIdAndUpdate(
                submissionId,
                {
                    status: "Completed",
                    verdict: "Runtime Error",
                }
            );

            console.error(error);

            throw error;
        }
    },

    {
        connection: redisConnection,

        // Number of jobs processed simultaneously
        concurrency: 5,
    }
);

worker.on("completed", (job) => {
    console.log(
        `Job ${job.id} completed`
    );
});

worker.on("failed", (job, err) => {
    console.log(
        `Job ${job?.id} failed`
    );

    console.log(err.message);
});

export default worker;