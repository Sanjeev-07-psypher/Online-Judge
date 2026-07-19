const leaderboardSchemas = {
    LeaderboardEntry: {
        type: "object",
        properties: {
            rank: {
                type: "integer",
                example: 1,
            },
            username: {
                type: "string",
                example: "sanju",
            },
            solvedProblems: {
                type: "integer",
                example: 50,
            },
            totalSubmissions: {
                type: "integer",
                example: 120,
            },
        },
    },
};

export default leaderboardSchemas;