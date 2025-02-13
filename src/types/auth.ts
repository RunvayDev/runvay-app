import { JWT } from "next-auth/jwt";
import { Session as NextAuthSession } from "next-auth";

export interface Token extends JWT {
  id: string;
  email: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Session extends NextAuthSession {
  user: User;
}