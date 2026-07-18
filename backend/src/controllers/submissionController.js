import Submission from "../models/Submission.js";
import submissionQueue from "../queues/submissionQueue.js";

import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const createSubmission = asyncHandler(
    async (req, res) => {
        const {
            problemId,
            code,
            language,
        } = req.body;

        if (
            !problemId ||
            !code ||
            !language
        ) {
            throw new AppError(
                "All fields are required",
                400
            );
        }

        const submission =
            await Submission.create({
                user: req.user._id,
                problem: problemId,
                code,
                language,
            });

        await submissionQueue.add(
            "judge-submission",
            {
                submissionId:
                    submission._id,
            }
        );

        const updatedSubmission =
            await Submission.findById(
                submission._id
            );

        res.status(201).json({
            success: true,
            submission:
                updatedSubmission,
        });
    }
);

export const getMySubmissions =
    asyncHandler(
        async (req, res) => {
            const submissions =
                await Submission.find({
                    user:
                        req.user._id,
                })
                    .populate(
                        "problem",
                        "title difficulty"
                    )
                    .sort({
                        createdAt:
                            -1,
                    });

            res.status(200).json({
                success: true,
                count: submissions.length,
                submissions,
            });
        }
    );

export const getSubmissionById =
    asyncHandler(
        async (req, res) => {
            const submission =
                await Submission.findById(
                    req.params.id
                )
                    .populate(
                        "user",
                        "username email"
                    )
                    .populate(
                        "problem",
                        "title difficulty"
                    );

            if (!submission) {
                throw new AppError(
                    "Submission not found",
                    404
                );
            }

            res.status(200).json({
                success: true,
                submission,
            });
        }
    );

export const getRecentSubmissions =
    asyncHandler(
        async (req, res) => {
            const page =
                Number(
                    req.query.page
                ) || 1;

            const limit =
                Number(
                    req.query.limit
                ) || 10;

            const skip =
                (page - 1) *
                limit;

            const totalSubmissions =
                await Submission.countDocuments();

            const submissions =
                await Submission.find()
                    .populate(
                        "user",
                        "username"
                    )
                    .populate(
                        "problem",
                        "title"
                    )
                    .sort({
                        createdAt:
                            -1,
                    })
                    .skip(skip)
                    .limit(limit)
                    .select(
                        "user problem language verdict executionTime memoryUsed passedTestCases totalTestCases createdAt"
                    );

            return res
                .status(200)
                .json({
                    success: true,
                    page,
                    limit,
                    totalSubmissions,
                    totalPages:
                        Math.ceil(
                            totalSubmissions /
                                limit
                        ),
                    submissions,
                });
        }
    );