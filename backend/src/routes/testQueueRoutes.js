import express from "express";
import submissionQueue from "../queues/submissionQueue.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const job = await submissionQueue.add("test-job", {
    message: "BullMQ Working",
    createdAt: Date.now(),
  });

  return res.status(200).json({
    success: true,
    jobId: job.id,
  });
});

export default router;