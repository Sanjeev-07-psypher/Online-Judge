import mongoose from "mongoose";

import User from "../models/User.js";
import Submission from "../models/Submission.js";

import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const getUserProfile = asyncHandler(
    async (req, res) => {
        const { id } = req.params;

        const user = await User.findById(id).select(
            "-password -__v -createdAt -updatedAt"
        );

        if (!user) {
            throw new AppError(
                "User not found",
                404
            );
        }

        const totalSubmissions =
            await Submission.countDocuments({
                user: id,
            });

        const acceptedSubmissions =
            await Submission.countDocuments({
                user: id,
                verdict: "Accepted",
            });

        const solvedProblemsData =
            await Submission.aggregate([
                {
                    $match: {
                        user: new mongoose.Types.ObjectId(
                            id
                        ),
                        verdict: "Accepted",
                    },
                },
                {
                    $group: {
                        _id: "$problem",
                    },
                },
                {
                    $count: "count",
                },
            ]);

        const solvedProblems =
            solvedProblemsData[0]?.count || 0;

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

        const recentSubmissions =
            await Submission.find({
                user: id,
            })
                .populate(
                    "problem",
                    "title"
                )
                .sort({
                    createdAt: -1,
                })
                .limit(10)
                .select(
                    "verdict language executionTime memoryUsed createdAt problem"
                );

        const leaderboard =
            await Submission.aggregate([
                {
                    $match: {
                        verdict: "Accepted",
                    },
                },
                {
                    $group: {
                        _id: {
                            user: "$user",
                            problem:
                                "$problem",
                        },
                    },
                },
                {
                    $group: {
                        _id: "$_id.user",
                        solvedProblems:
                            {
                                $sum: 1,
                            },
                    },
                },
                {
                    $lookup: {
                        from:
                            "submissions",
                        let: {
                            userId:
                                "$_id",
                        },
                        pipeline: [
                            {
                                $match:
                                    {
                                        verdict:
                                            "Accepted",
                                        $expr:
                                            {
                                                $eq: [
                                                    "$user",
                                                    "$$userId",
                                                ],
                                            },
                                    },
                            },
                            {
                                $count:
                                    "acceptedSubmissions",
                            },
                        ],
                        as: "acceptedData",
                    },
                },
                {
                    $addFields: {
                        acceptedSubmissions:
                            {
                                $ifNull:
                                    [
                                        {
                                            $arrayElemAt:
                                                [
                                                    "$acceptedData.acceptedSubmissions",
                                                    0,
                                                ],
                                        },
                                        0,
                                    ],
                            },
                    },
                },
                {
                    $sort: {
                        solvedProblems:
                            -1,
                        acceptedSubmissions:
                            -1,
                    },
                },
            ]);

        const rank =
            leaderboard.findIndex(
                (entry) =>
                    entry._id.toString() ===
                    id
            ) + 1;

        return res.status(200).json({
            success: true,
            profile: {
                user,
                rank,
                totalSubmissions,
                acceptedSubmissions,
                solvedProblems,
                acceptanceRate,
                recentSubmissions,
            },
        });
    }
);