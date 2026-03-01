import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in .env");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "testdb", // optional, can use your DB name
    });

    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDb;