import mongoose from "mongoose";

const connectMongo = async () => {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

export default connectMongo;
