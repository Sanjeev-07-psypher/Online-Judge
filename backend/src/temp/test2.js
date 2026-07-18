import errorMiddleware from "../middleware/errorMiddleware.js";

const error = {
    name: "CastError",
    message: "Cast failed",
};

errorMiddleware(
    error,
    {},
    {
        status(code) {
            console.log(
                "STATUS:",
                code
            );

            return {
                json(data) {
                    console.log(data);
                },
            };
        },
    }
);