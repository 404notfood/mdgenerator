import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
  baseURL: process.env.AUTH_URL || "http://localhost:3000",
})

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient