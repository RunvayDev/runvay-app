import mongoose from "mongoose";
import Product from "../models/Product";

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

export async function getAllProducts() {
  await connectMongo();
  const products = await Product.find({}).lean();
  return products;
}

export async function getProductBySlug(slug: string) {
  await connectMongo();
  const product = await Product.findOne({ slug }); // Find product by slug
  return product;
}

export default connectMongo;
