const submissionPaths = {
    "/api/submissions": {
        post: {
            tags: ["Submissions"],
            summary: "Create a submission",

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
                            type: "object",
                            required: [
                                "problemId",
                                "code",
                                "language",
                            ],
                            properties: {
                                problemId: {
                                    type: "string",
                                },
                                code: {
                                    type: "string",
                                },
                                language: {
                                    type: "string",
                                    example: "cpp",
                                },
                            },
                        },
                    },
                },
            },

            responses: {
                201: {
                    description:
                        "Submission created successfully",
                },
                400: {
                    description:
                        "Invalid request",
                },
                401: {
                    description:
                        "Unauthorized",
                },
            },
        },
    },

    "/api/submissions/my": {
        get: {
            tags: ["Submissions"],
            summary:
                "Get current user's submissions",

            security: [
                {
                    BearerAuth: [],
                },
            ],

            responses: {
                200: {
                    description:
                        "Submissions fetched successfully",
                },
            },
        },
    },

    "/api/submissions/recent": {
        get: {
            tags: ["Submissions"],
            summary:
                "Get recent submissions",

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
                        "Recent submissions fetched successfully",
                },
            },
        },
    },

    "/api/submissions/{id}": {
        get: {
            tags: ["Submissions"],
            summary:
                "Get submission by ID",

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
                        "Submission fetched successfully",
                },
                404: {
                    description:
                        "Submission not found",
                },
            },
        },
    },
};

export default submissionPaths;