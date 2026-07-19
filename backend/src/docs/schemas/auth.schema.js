const authSchemas = {
    RegisterRequest: {
        type: "object",
        required: ["username", "email", "password"],
        properties: {
            username: {
                type: "string",
            },
            email: {
                type: "string",
            },
            password: {
                type: "string",
            },
        },
    },

    LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: {
                type: "string",
            },
            password: {
                type: "string",
            },
        },
    },

    AuthResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
            },
            token: {
                type: "string",
            },
            user: {
                $ref: "#/components/schemas/User",
            },
        },
    },
};

export default authSchemas;