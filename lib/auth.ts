import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations/auth";

// Providers — OAuth only loads when keys are present
const providers = [
  Credentials({
    async authorize(credentials) {
      try {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        // Only query DB if DATABASE_URL is set
        if (!process.env.DATABASE_URL) return null;

        const { db } = await import("@/lib/db");
        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.hashedPassword) return null;
        const valid = await bcrypt.compare(password, user.hashedPassword);
        if (!valid) return null;
        return user;
      } catch {
        return null;
      }
    },
  }),
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ]
    : []),
  ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
    ? [
        GitHub({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
      ]
    : []),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret-change-in-production",
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers,
  callbacks: {
    async signIn({ user, account }) {
      // For OAuth providers, upsert the user into our database
      if (account?.provider !== "credentials" && user.email) {
        try {
          const { db } = await import("@/lib/db");
          const existing = await db.user.findUnique({ where: { email: user.email } });
          if (!existing) {
            const created = await db.user.create({
              data: {
                email: user.email,
                name: user.name ?? null,
                image: user.image ?? null,
                role: "GUEST",
              },
            });
            user.id = created.id;
          } else {
            user.id = existing.id;
          }
        } catch (e) {
          console.error("[AUTH_SIGNIN_UPSERT]", e);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Credentials provider has role on the user object already
        // OAuth users need a DB lookup since user.role is not set
        if ((user as any).role) {
          token.role = (user as any).role;
        } else if (user.id) {
          try {
            const { db } = await import("@/lib/db");
            const dbUser = await db.user.findUnique({ where: { id: user.id } });
            token.role = dbUser?.role ?? "GUEST";
          } catch {
            token.role = "GUEST";
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
