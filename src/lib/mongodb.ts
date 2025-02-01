import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Mongo URI is not defined");
}
let cached = global.mongoose;


if (!cached) 
  cached = global.mongoose = { conn: null, promise: null };

export async function connectToDataBase() {
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

 
