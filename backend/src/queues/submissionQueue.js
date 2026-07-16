import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const submissionQueue = new Queue(
    "submissionQueue",
    {
        connection: redisConnection,

        defaultJobOptions: {
            attempts: 3,

            backoff: {
                type: "exponential",
                delay: 2000,
            },

            removeOnComplete: 100,

            removeOnFail: 50,
        },
    }
);

export default submissionQueue;