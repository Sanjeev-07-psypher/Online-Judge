import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import redisConnection from "./config/redis.js";

dotenv.config();

import "./workers/submissionWorker.js"; 

const PORT = process.env.PORT || 5000;

const startServer = async ()=>{
    await connectDB();

    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    });
};

startServer();