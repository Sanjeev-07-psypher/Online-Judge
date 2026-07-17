import express from "express";
import { authLimiter } from "../middleware/rateLimitMiddleware.js";
import {
    registerUser,
    loginUser,
    getMe
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.get("/me", protect, getMe);

export default router;