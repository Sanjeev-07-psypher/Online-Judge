const problemPaths = {
    "/api/problems": {
        post: {
            tags: ["Problems"],
            summary: "Create a new problem",

            security: [
                {
                    BearerAuth: [],
                },
            ],

            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Problem",
                        },
                    },
                },
            },

            responses: {
                201: {
                    description:
                        "Problem created successfully",
                },
                401: {
                    description: "Unauthorized",
                },
            },
        },

        get: {
            tags: ["Problems"],
            summary: "Get all problems",

            responses: {
                200: {
                    description:
                        "Problems fetched successfully",
                },
            },
        },
    },

    "/api/problems/{id}": {
        get: {
            tags: ["Problems"],
            summary:
                "Get problem by ID",

            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],

            responses: {
                200: {
                    description:
                        "Problem fetched successfully",
                },
                404: {
                    description:
                        "Problem not found",
                },
            },
        },

        put: {
            tags: ["Problems"],
            summary:
                "Update problem",

            security: [
                {
                    BearerAuth: [],
                },
            ],

            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],

            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Problem",
                        },
                    },
                },
            },

            responses: {
                200: {
                    description:
                        "Problem updated successfully",
                },
                404: {
                    description:
                        "Problem not found",
                },
            },
        },

        delete: {
            tags: ["Problems"],
            summary:
                "Delete problem",

            security: [
                {
                    BearerAuth: [],
                },
            ],

            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],

            responses: {
                200: {
                    description:
                        "Problem deleted successfully",
                },
                404: {
                    description:
                        "Problem not found",
                },
            },
        },
    },

    "/api/problems/{id}/stats": {
        get: {
            tags: ["Problems"],
            summary:
                "Get problem statistics",

            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],

            responses: {
                200: {
                    description:
                        "Problem statistics fetched successfully",
                },
            },
        },
    },
};

export default problemPaths;