import "./config/loadEnv.js";

import app from "./app.js";
import connectDB from "./config/db.js";
import redisConnection from "./config/redis.js";

import "./workers/submissionWorker.js";
import "./workers/aiAnalysisWorker.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(
            `Server is running on port ${PORT}`
        );
    });
};

startServer();