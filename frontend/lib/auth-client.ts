import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://thinkbox-production.up.railway.app:3000",
});

export const { signIn, signUp, signOut, useSession } = authClient;
