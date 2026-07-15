import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import { judgeSubmission } from "../services/judgeService.js";
import Submission from "../models/Submission.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
});

await connectDB();

const submissions = await Submission.find().limit(10);

console.log(submissions);

const result = await judgeSubmission(
    "6a57388c2ec6bfb574de9eaa"
);

console.log(result);