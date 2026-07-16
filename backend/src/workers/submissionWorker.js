import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";

const worker = new Worker(
  "submissionQueue",
  async (job) => {
    console.log("=================================");
    console.log("Processing Job:", job.id);
    console.log("Job Data:", job.data);
    console.log("=================================");
  },
  {
    connection: redisConnection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed`);
  console.log(err.message);
});

export default worker;