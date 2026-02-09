import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    try {
        await mongoose.connect(mongoURI);
    } catch (error) {
        console.error("MongoDB connection error");
        process.exit(1);
    }
};

export default connectDB;
