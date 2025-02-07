// lib/authServer.ts (Server-Side Only)
import  { auth} from "./auth"

export const fetchSession = async () => {
  const session = await auth();
  return session;
};
