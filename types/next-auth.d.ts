import { DefaultSession } from "next-auth";
import { GoogleProfile } from "next-auth/providers/google";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** the user mongodb unique id */
      id: string;
    } & DefaultSession["user"];
  }

  /** The OAuth profile returned from Google */
  interface Profile extends GoogleProfile {}
}
