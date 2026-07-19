import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const aiAnalysisQueue = new Queue(
    "ai-analysis",
    {
        connection: redisConnection,
    }
);

export default aiAnalysisQueue;