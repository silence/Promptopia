// Auth
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Models
import User from "@models/user";

// Utils
import { connectToDatabase } from "@utils/database";

// Types
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user?.email || "",
      });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }
      console.log("Server session: ", session);
      return session;
    },
    async signIn({ profile }) {
      console.log("profile: ", profile);
      try {
        await connectToDatabase();

        // check if a user already exists
        const userExists = await User.findOne({ email: profile?.email });

        console.log("userExists: ", userExists);

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }
        return true;

        // serverless -> lambda
      } catch (error) {
        console.log("error: ", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
