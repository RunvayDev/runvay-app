import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
  sessionId: string;
  userId: string;
  expiresAt: Date;
}

const sessionSchema = new Schema<ISession>({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: String, required: true }, // Reference to the user's _id
  expiresAt: { type: Date, required: true }, // Expiration timestamp
});

// Automatically expire sessions after a set period
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Session || mongoose.model<ISession>("Session", sessionSchema);
