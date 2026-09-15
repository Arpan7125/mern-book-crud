import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not set in .env");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log(`MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);

        process.exit(1);
    }
};

export default connectDB;
