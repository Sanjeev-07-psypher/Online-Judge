import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend Running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);

export default app;