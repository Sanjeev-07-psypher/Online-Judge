const userSchemas = {
    User: {
        type: "object",
        properties: {
            _id: {
                type: "string",
                example: "6879abc123456789",
            },
            username: {
                type: "string",
                example: "sanju",
            },
            email: {
                type: "string",
                example: "sanju@gmail.com",
            },
            createdAt: {
                type: "string",
                format: "date-time",
            },
        },
    },
};

export default userSchemas;