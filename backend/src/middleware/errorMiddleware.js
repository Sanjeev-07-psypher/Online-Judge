const handleCastError = () => ({
    statusCode: 400,
    message: "Invalid resource id",
});

const handleValidationError = (
    error
) => ({
    statusCode: 400,
    message: Object.values(
        error.errors
    )
        .map((val) => val.message)
        .join(", "),
});

const handleDuplicateKeyError = (
    error
) => ({
    statusCode: 409,
    message: `${Object.keys(error.keyValue)[0]
        } already exists`,
});

const handleJWTError = () => ({
    statusCode: 401,
    message: "Invalid token",
});

const handleJWTExpiredError = () => ({
    statusCode: 401,
    message: "Token expired",
});

const errorMiddleware = (
    error,
    req,
    res,
    next
) => {
    let err = { ...error };

    err.message = error.message;

    if (error.name === "CastError") {
        err = handleCastError(error);
    }

    if (
        error.name === "ValidationError"
    ) {
        err =
            handleValidationError(error);
    }

    if (error.code === 11000) {
        err =
            handleDuplicateKeyError(
                error
            );
    }

    if (
        error.name === "JsonWebTokenError"
    ) {
        err = handleJWTError();
    }

    if (
        error.name === "TokenExpiredError"
    ) {
        err = handleJWTExpiredError();
    }

    return res.status(
        err.statusCode || 500
    ).json({
        success: false,
        message:
            err.message ||
            "Internal Server Error",
        ...(process.env.NODE_ENV ===
            "development" && {
            stack: error.stack,
        }),
    });
};

export default errorMiddleware;