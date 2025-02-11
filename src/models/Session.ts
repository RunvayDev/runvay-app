import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
  sessionId: string;
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: Date;
}

const SessionSchema = new Schema<ISession>({
  sessionId: { type: String, required: true, unique: true },
  user:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date, required: true }, // Expiration timestamp
});

// Automatically expire sessions after a set period
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });



SessionSchema.statics.createOrUpdateSession = async function(userId, sessionId) {
  try {
    // Try to find and update existing session
    let session = await this.findOne({ user: userId });

    if (session) {
      session.sessionId = sessionId;
      session.expiresAt = new Date(+new Date() + 7*24*60*60*1000);
      await session.save();
    } else {
      // Create new session if not exists
      session = await this.create({
        sessionId,
        user: userId,
      });
    }

    return session;
  } catch (error) {
    console.error('Session creation error:', error);
    throw error;
  }
};


export default mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema);
