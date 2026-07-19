import commonSchemas from "./schemas/common.schema.js";
import userSchemas from "./schemas/user.schema.js";
import authSchemas from "./schemas/auth.schema.js";
import problemSchemas from "./schemas/problem.schema.js";
import submissionSchemas from "./schemas/submission.schema.js";
import leaderboardSchemas from "./schemas/leaderboard.schema.js";

import authPaths from "./paths/auth.paths.js";
import problemPaths from "./paths/problem.paths.js";
import submissionPaths from "./paths/submission.paths.js";
import leaderboardPaths from "./paths/leaderboard.paths.js";
import userPaths from "./paths/user.paths.js";

const swaggerSpec = {
    openapi: "3.0.0",

    info: {
        title: "Online Judge API",
        version: "1.0.0",
        description: "Online Judge Backend API Documentation",
    },

    servers: [
        {
            url: "http://localhost:5000",
        },
    ],

    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },

        schemas: {
            ...commonSchemas,
            ...userSchemas,
            ...authSchemas,
            ...problemSchemas,
            ...submissionSchemas,
            ...leaderboardSchemas,
        },
    },

    paths: {
        ...authPaths,
        ...problemPaths,
        ...submissionPaths,
        ...leaderboardPaths,
        ...userPaths,
    },
};

export default swaggerSpec;