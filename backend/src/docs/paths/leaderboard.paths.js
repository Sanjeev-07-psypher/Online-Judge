const leaderboardPaths = {
    "/api/leaderboard": {
        get: {
            tags: ["Leaderboard"],
            summary: "Get global leaderboard",

            parameters: [
                {
                    name: "page",
                    in: "query",
                    schema: {
                        type: "integer",
                        example: 1,
                    },
                },
                {
                    name: "limit",
                    in: "query",
                    schema: {
                        type: "integer",
                        example: 10,
                    },
                },
            ],

            responses: {
                200: {
                    description:
                        "Leaderboard fetched successfully",
                },

                500: {
                    description:
                        "Failed to fetch leaderboard",
                },
            },
        },
    },
};

export default leaderboardPaths;