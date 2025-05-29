import mongoose from "mongoose";


const MONGODB_URL = process.env.MONGODB_URI;

export const connectDB = async() => {
    if (mongoose.connection.readyState === 1) return;
    if (!MONGODB_URL) {
        throw new Error("MONGODB_URI environment variable is not defined");
    }
    return mongoose.connect(MONGODB_URL);
}