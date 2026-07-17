import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    createSubmission,
    getMySubmissions,
    getSubmissionById,
    getRecentSubmissions,
} from "../controllers/submissionController.js";

const router = express.Router();

router.post("/", protect, createSubmission);

router.get("/my", protect, getMySubmissions);

router.get("/recent", getRecentSubmissions);

router.get("/:id", protect, getSubmissionById);

export default router;