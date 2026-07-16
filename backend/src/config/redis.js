import Redis from "ioredis";

const redisConnection = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("Redis Connected");
});

redisConnection.on("error", (err) => {
  console.error("Redis Error:", err.message);
});

export default redisConnection;