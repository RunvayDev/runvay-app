import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { comparePassword} from "@/utils/password";
import { getUserFromDb} from "@/utils/db";
import { connectToDataBase} from "@/lib/mongodb";
import User from "@/models/User"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [ 

    Google({
      async profile(profile) {
        await connectToDataBase();

        let user = await User.findOne({ email: profile.email });

        if (!user) {
          user = await User.create({
            name: profile.name,
            email: profile.email,
            provider: "google",
          });
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
    Credentials({
    // You can specify which fields should be submitted, by adding keys to the credentials object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {  },
      password: {},
    },
 
authorize: async (credentials) => {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Missing credentials.");
  }

  const user = await getUserFromDb(credentials.email as string);
  if (!user || !user.salt || !user.hashedPassword) {
    throw new Error("Invalid credentials.");
  }

  const isPasswordValid = comparePassword(credentials.password as string, user.hashedPassword, user.salt);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials.");
  }

  return { id: user.id, email: user.email, name: user.name };
}

  }),],

  pages: {
    signIn: "/signin",
   
  },
});  