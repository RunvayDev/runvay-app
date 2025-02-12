import mongoose from "mongoose";
import Product from "@/models/Product";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Mongo URI is not defined");
}
let cached = global.mongoose;
  

if (!cached) 
  cached = global.mongoose = { conn: null, promise: null };

export async function connectToDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts ={
      bufferCommands: true,
      maxPoolSize: 5,
 
    }
      cached.promise = mongoose.connect(MONGO_URI, opts).then(()=> mongoose.connection)
  }

   try {
    cached.conn = await cached.promise;
   } catch (error) {
      cached.promise = null;
      throw error;
   }
}

export async function getAllProducts() {
  await connectToDb();
  const products = await Product.find({}).lean();
  return products;
}

export async function getProductBySlug(slug: string) {
  await connectToDb();
  const product = await Product.findOne({ slug }); // Find product by slug
  return product;
}
