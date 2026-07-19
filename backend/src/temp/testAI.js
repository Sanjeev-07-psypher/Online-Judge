import dotenv from "dotenv";

dotenv.config({
    path: "../../.env",
});

const { default: mongoose } =
    await import("mongoose");

const { default: dbConnect } =
    await import("../config/db.js");

const { default: analyzeSubmission } =
    await import("../services/aiAnalysisService.js");

await dbConnect();

try {
    const result =
        await analyzeSubmission(
            "6a5cc5f6c09f2e5766e8aab6"
        );

    console.log(
        JSON.stringify(result, null, 2)
    );
} catch (error) {
    console.error(error);
}

await mongoose.connection.close();