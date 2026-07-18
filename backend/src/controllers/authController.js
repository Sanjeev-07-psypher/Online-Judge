import bcrypt from "bcryptjs";

import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const registerUser = asyncHandler(
    async (req, res) => {
        const {
            username,
            email,
            password,
        } = req.body;

        if (
            !username ||
            !email ||
            !password
        ) {
            throw new AppError(
                "All fields are required",
                400
            );
        }

        const existingUser =
            await User.findOne({
                email,
            });

        if (existingUser) {
            throw new AppError(
                "User already exists",
                409
            );
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user =
            await User.create({
                username,
                email,
                password:
                    hashedPassword,
            });

        const token =
            generateToken(
                user._id
            );

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                username:
                    user.username,
                email:
                    user.email,
                role: user.role,
            },
        });
    }
);

export const loginUser = asyncHandler(
    async (req, res) => {
        const { email, password } =
            req.body;

        if (!email || !password) {
            throw new AppError(
                "All fields are required",
                400
            );
        }

        const user =
            await User.findOne({
                email,
            });

        if (!user) {
            throw new AppError(
                "Invalid credentials",
                401
            );
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            throw new AppError(
                "Invalid credentials",
                401
            );
        }

        const token =
            generateToken(
                user._id
            );

        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username:
                    user.username,
                email:
                    user.email,
                role: user.role,
            },
        });
    }
);

export const getMe =
    asyncHandler(
        async (req, res) => {
            return res
                .status(200)
                .json({
                    success: true,
                    user: req.user,
                });
        }
    );