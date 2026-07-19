const submissionSchemas = {
    Submission: {
        type: "object",
        properties: {
            _id: {
                type: "string",
            },
            user: {
                type: "string",
            },
            problem: {
                type: "string",
            },
            language: {
                type: "string",
                example: "cpp",
            },
            status: {
                type: "string",
                example: "Completed",
            },
            verdict: {
                type: "string",
                example: "Accepted",
            },
            executionTime: {
                type: "number",
                example: 12,
            },
            memoryUsed: {
                type: "number",
                example: 5.2,
            },
            createdAt: {
                type: "string",
                format: "date-time",
            },
        },
    },
};

export default submissionSchemas;