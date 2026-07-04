import express from "express";

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    console.log("App is running!");
    res.status(200).json({
        success: true,
        message: "Backend Running"
    });
});

export default app;