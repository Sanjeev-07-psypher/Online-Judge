import express from "express";

import {
    createProblem,
    getProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
} from "../controllers/problemController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProblem);

router.get("/", getProblems);

router.get("/:id", getProblemById);

router.put("/:id", protect, updateProblem);

router.delete("/:id", protect, deleteProblem);

export default router;