import mongoose from "mongoose";

import Problem from "../models/Problem.js";
import Submission from "../models/Submission.js";

export const createProblem = async (req, res) => {
    try {
        const problem = await Problem.create({
            ...req.body,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            problem,
        });
    } catch (error) {
        console.error("CREATE PROBLEM ERROR:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find()
            .populate("createdBy", "username email");

        res.status(200).json({
            success: true,
            count: problems.length,
            problems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id)
            .populate("createdBy", "username email");

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        res.status(200).json({
            success: true,
            problem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProblem = async (req, res) => {
    try {
        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        res.status(200).json({
            success: true,
            problem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        await problem.deleteOne();

        res.status(200).json({
            success: true,
            message: "Problem deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProblemStats = async (req, res) => {
    try {
        const { id } = req.params;

        const problemId =
            new mongoose.Types.ObjectId(id);

        const totalSubmissions =
            await Submission.countDocuments({
                problem: problemId,
            });

        const acceptedSubmissions =
            await Submission.countDocuments({
                problem: problemId,
                verdict: "Accepted",
            });

        const acceptanceRate =
            totalSubmissions === 0
                ? 0
                : Number(
                      (
                          (acceptedSubmissions /
                              totalSubmissions) *
                          100
                      ).toFixed(2)
                  );

        const metrics =
            await Submission.aggregate([
                {
                    $match: {
                        problem: problemId,
                        verdict: "Accepted",
                        executionTime: {
                            $ne: null,
                        },
                        memoryUsed: {
                            $ne: null,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        averageExecutionTime: {
                            $avg: "$executionTime",
                        },
                        averageMemoryUsed: {
                            $avg: "$memoryUsed",
                        },
                    },
                },
            ]);

        const averageExecutionTime =
            metrics[0]?.averageExecutionTime || 0;

        const averageMemoryUsed =
            metrics[0]?.averageMemoryUsed || 0;

        return res.status(200).json({
            success: true,
            stats: {
                totalSubmissions,
                acceptedSubmissions,
                acceptanceRate,
                averageExecutionTime: Number(
                    averageExecutionTime.toFixed(2)
                ),
                averageMemoryUsed: Number(
                    averageMemoryUsed.toFixed(2)
                ),
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch problem statistics",
        });
    }
};