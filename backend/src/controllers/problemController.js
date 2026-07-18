import mongoose from "mongoose";

import Problem from "../models/Problem.js";
import Submission from "../models/Submission.js";

import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const createProblem = asyncHandler(
    async (req, res) => {
        const problem = await Problem.create({
            ...req.body,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            problem,
        });
    }
);

export const getProblems = asyncHandler(
    async (req, res) => {
        const problems = await Problem.find()
            .populate(
                "createdBy",
                "username email"
            );

        res.status(200).json({
            success: true,
            count: problems.length,
            problems,
        });
    }
);

export const getProblemById =
    asyncHandler(
        async (req, res) => {
            const problem =
                await Problem.findById(
                    req.params.id
                ).populate(
                    "createdBy",
                    "username email"
                );

            if (!problem) {
                throw new AppError(
                    "Problem not found",
                    404
                );
            }

            res.status(200).json({
                success: true,
                problem,
            });
        }
    );

export const updateProblem =
    asyncHandler(
        async (req, res) => {
            const problem =
                await Problem.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                        runValidators: true,
                    }
                );

            if (!problem) {
                throw new AppError(
                    "Problem not found",
                    404
                );
            }

            res.status(200).json({
                success: true,
                problem,
            });
        }
    );

export const deleteProblem =
    asyncHandler(
        async (req, res) => {
            const problem =
                await Problem.findById(
                    req.params.id
                );

            if (!problem) {
                throw new AppError(
                    "Problem not found",
                    404
                );
            }

            await problem.deleteOne();

            res.status(200).json({
                success: true,
                message:
                    "Problem deleted successfully",
            });
        }
    );

export const getProblemStats =
    asyncHandler(
        async (req, res) => {
            const { id } =
                req.params;

            const problemId =
                new mongoose.Types.ObjectId(
                    id
                );

            const totalSubmissions =
                await Submission.countDocuments(
                    {
                        problem:
                            problemId,
                    }
                );

            const acceptedSubmissions =
                await Submission.countDocuments(
                    {
                        problem:
                            problemId,
                        verdict:
                            "Accepted",
                    }
                );

            const acceptanceRate =
                totalSubmissions ===
                0
                    ? 0
                    : Number(
                          (
                              (acceptedSubmissions /
                                  totalSubmissions) *
                              100
                          ).toFixed(2)
                      );

            const metrics =
                await Submission.aggregate(
                    [
                        {
                            $match:
                                {
                                    problem:
                                        problemId,
                                    verdict:
                                        "Accepted",
                                    executionTime:
                                        {
                                            $ne: null,
                                        },
                                    memoryUsed:
                                        {
                                            $ne: null,
                                        },
                                },
                        },
                        {
                            $group:
                                {
                                    _id: null,
                                    averageExecutionTime:
                                        {
                                            $avg: "$executionTime",
                                        },
                                    averageMemoryUsed:
                                        {
                                            $avg: "$memoryUsed",
                                        },
                                },
                        },
                    ]
                );

            const averageExecutionTime =
                metrics[0]
                    ?.averageExecutionTime ||
                0;

            const averageMemoryUsed =
                metrics[0]
                    ?.averageMemoryUsed ||
                0;

            return res.status(
                200
            ).json({
                success: true,
                stats: {
                    totalSubmissions,
                    acceptedSubmissions,
                    acceptanceRate,
                    averageExecutionTime:
                        Number(
                            averageExecutionTime.toFixed(
                                2
                            )
                        ),
                    averageMemoryUsed:
                        Number(
                            averageMemoryUsed.toFixed(
                                2
                            )
                        ),
                },
            });
        }
    );