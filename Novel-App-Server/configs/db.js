import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected!");
    }catch (error){
        console.error("[DB Connection Error]");
        console.error(error);
        process.exit(1);
    }
}