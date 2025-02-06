 
import { auth } from "@/lib/auth"

export async function getSessionUser(req: Request) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}
