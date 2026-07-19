const commonSchemas = {
    ErrorResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false,
            },
            message: {
                type: "string",
                example: "Something went wrong",
            },
        },
    },

    SuccessResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true,
            },
            message: {
                type: "string",
                example: "Operation successful",
            },
        },
    },
};

export default commonSchemas;