import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000",
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      scope: ["read:user", "user:email", "repo"],
      async getUserInfo(token) {
        try {
          const accessToken = token.accessToken || (token as any).access_token

          // Fetch user profile
          const userRes = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "User-Agent": "MarkdownPro-App",
              Accept: "application/vnd.github+json",
            },
          })

          if (!userRes.ok) return null

          const user = await userRes.json()

          // Try to fetch emails (might fail if scope not granted)
          let email = user.email
          let emailVerified = false

          const emailsRes = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "User-Agent": "MarkdownPro-App",
              Accept: "application/vnd.github+json",
            },
          })

          if (emailsRes.ok) {
            const emails = await emailsRes.json()
            if (Array.isArray(emails) && emails.length > 0) {
              const primaryEmail = emails.find((e: any) => e.primary && e.verified)
                || emails.find((e: any) => e.verified)
                || emails[0]
              email = primaryEmail?.email || user.email
              emailVerified = primaryEmail?.verified || false
            }
          }

          // Fallback: use GitHub noreply email
          if (!email) {
            email = `${user.id}+${user.login}@users.noreply.github.com`
            emailVerified = true
          }

          return {
            user: {
              id: String(user.id),
              name: user.name || user.login,
              email: email,
              image: user.avatar_url,
              emailVerified: emailVerified,
            },
            data: user,
          }
        } catch (error) {
          console.error("GitHub OAuth error:", error)
          return null
        }
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session