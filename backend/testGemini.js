import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

console.log("KEY EXISTS:", !!process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: "Explain binary search in one sentence."
    });

    console.log(response.text);
}

main().catch(console.error);