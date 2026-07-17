import Submission from "../models/Submission.js";

export const getLeaderboard = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const leaderboard = await Submission.aggregate([
            {
                $match: {
                    verdict: "Accepted",
                },
            },

            {
                $group: {
                    _id: {
                        user: "$user",
                        problem: "$problem",
                    },
                },
            },

            {
                $group: {
                    _id: "$_id.user",
                    solvedProblems: {
                        $sum: 1,
                    },
                },
            },

            {
                $lookup: {
                    from: "submissions",
                    let: {
                        userId: "$_id",
                    },
                    pipeline: [
                        {
                            $match: {
                                verdict: "Accepted",
                                $expr: {
                                    $eq: ["$user", "$$userId"],
                                },
                            },
                        },
                        {
                            $count: "acceptedSubmissions",
                        },
                    ],
                    as: "acceptedData",
                },
            },

            {
                $addFields: {
                    acceptedSubmissions: {
                        $ifNull: [
                            {
                                $arrayElemAt: [
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
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },

            {
                $unwind: "$user",
            },

            {
                $project: {
                    _id: 0,
                    userId: "$user._id",
                    username: "$user.username",
                    solvedProblems: 1,
                    acceptedSubmissions: 1,
                },
            },

            {
                $sort: {
                    solvedProblems: -1,
                    acceptedSubmissions: -1,
                },
            },

            {
                $facet: {
                    leaderboard: [
                        {
                            $skip: skip,
                        },
                        {
                            $limit: limit,
                        },
                    ],
                    totalUsers: [
                        {
                            $count: "count",
                        },
                    ],
                },
            },
        ]);

        const leaderboardData =
            leaderboard[0].leaderboard;

        const totalUsers =
            leaderboard[0].totalUsers[0]?.count || 0;

        const rankedLeaderboard =
            leaderboardData.map((user, index) => ({
                rank: skip + index + 1,
                ...user,
            }));

        return res.status(200).json({
            success: true,
            page,
            limit,
            totalUsers,
            totalPages: Math.ceil(
                totalUsers / limit
            ),
            leaderboard: rankedLeaderboard,
        });
    } catch (error) {
        console.error(
            "Leaderboard Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch leaderboard",
        });
    }
};