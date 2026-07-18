import jwt from "jsonwebtoken";

import User from "../models/User.js";

import AppError from "../utils/AppError.js";

const protect = async (
    req,
    res,
    next
) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith(
            "Bearer "
        )
    ) {
        token =
            req.headers.authorization.split(
                " "
            )[1];
    }

    if (!token) {
        return next(
            new AppError(
                "Authentication required",
                401
            )
        );
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user =
            await User.findById(
                decoded.id
            ).select(
                "-password"
            );

        if (!user) {
            return next(
                new AppError(
                    "User not found",
                    401
                )
            );
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

export default protect;