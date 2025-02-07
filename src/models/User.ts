import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  email: string;
  salt?: string;
  hashedPassword?: string;
  name: string;
  oauthProvider?: string;
  createdAt: Date;
  updatedAt: Date;
  cart: CartItem[]; // Add this line
}

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    salt: { type: String }, // Store salt
    hashedPassword: { type: String }, // Store hashed password
    name: { type: String, required: true },
    oauthProvider: {
      type: String,
      enum: ["google", "credentials"],
      default: "credentials",
    },
    cart: { type: Array, default: [] },
  }, // Add this line
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default User;
