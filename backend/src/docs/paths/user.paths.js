const userPaths = {
    "/api/users/{id}": {
        get: {
            tags: ["Users"],
            summary: "Get user profile",

            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    description: "User ID",
                },
            ],

            responses: {
                200: {
                    description:
                        "User profile fetched successfully",
                },

                404: {
                    description:
                        "User not found",
                },
            },
        },
    },
};

export default userPaths;