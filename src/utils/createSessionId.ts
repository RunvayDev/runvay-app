import { v4 as uuidv4 } from "uuid";
import Session from "@/models/Session";
import { connectToDataBase } from "@/lib/mongodb";

export const createSessionForUser = async (userId: string): Promise<string> => {
  await connectToDataBase();

  const sessionId = uuidv4(); // Generate a unique session ID
  const expiresIn = 60 * 60 * 24; // 24 hours in seconds (same as JWT expiration)
  const expirationDate = new Date(Date.now() + expiresIn * 1000);

  // Save session in the database
  await Session.create({
    sessionId,
    userId,
    expiresAt: expirationDate,
  });

  return sessionId;
};
