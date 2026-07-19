import dotenv from "dotenv";

dotenv.config({
    path: "../../.env",
});

const { default: ai } = await import("../config/gemini.js");
const { default: dbConnect } = await import("../config/db.js");
const mongoose = (await import("mongoose")).default;

console.log("GEMINI:", !!process.env.GEMINI_API_KEY);
console.log("MONGO:", !!process.env.MONGO_URI);

try {
    await dbConnect();

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: "Say hello in one sentence",
    });

    console.log("\nGemini Response:");
    console.log(response.text);

    await mongoose.connection.close();
} catch (error) {
    console.error(error);
}