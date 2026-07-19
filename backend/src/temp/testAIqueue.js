import dotenv from "dotenv";
dotenv.config();

import aiAnalysisQueue from "../queues/aiAnalysisQueue.js";

async function testQueue() {
    try {
        const job = await aiAnalysisQueue.add(
            "analyze-submission",
            {
                submissionId: "test-submission-id",
            }
        );

        console.log(
            "AI Job Added:",
            job.id
        );

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

testQueue();