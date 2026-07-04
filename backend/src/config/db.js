import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        const con =await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch(e){
        console.error("Mongo connection failed");
        console.error(e.message);
        process.exit(1);
    }
};

export default connectDB;