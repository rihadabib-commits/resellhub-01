import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "https://resellhub-01.vercel.app",
});

export const { signUp, signIn, signOut, useSession } = createAuthClient();