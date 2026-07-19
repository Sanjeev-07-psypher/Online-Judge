const problemSchemas = {
    Problem: {
        type: "object",
        properties: {
            _id: {
                type: "string",
            },
            title: {
                type: "string",
            },
            description: {
                type: "string",
            },
            difficulty: {
                type: "string",
                example: "Easy",
            },
            tags: {
                type: "array",
                items: {
                    type: "string",
                },
            },
            createdAt: {
                type: "string",
                format: "date-time",
            },
        },
    },
};

export default problemSchemas;