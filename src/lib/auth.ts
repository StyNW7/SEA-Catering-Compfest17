/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs";
import {prisma} from "@/lib/prisma";
import { loginSchema } from "@/lib/zod-schemas";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("NextAuth: Attempting to authorize credentials for email:", credentials?.email);

        const parsedCredentials = loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("NextAuth: Authorization failed: Invalid credentials format.", parsedCredentials.error.flatten().fieldErrors);
          return null; // Return null for invalid input format
        }

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.log("NextAuth: Authorization failed: User not found for email:", email);
          return null; // User not found in DB
        }

        if (!user.password) {
          console.log("NextAuth: Authorization failed: User found but no password set (e.g., social login user) for email:", email);
          return null; // User exists but doesn't have a password for credentials login
        }

        const passwordsMatch = await compare(password, user.password);

        if (passwordsMatch) {
          console.log("NextAuth: Authorization successful for user:", user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } else {
          console.log("NextAuth: Authorization failed: Password mismatch for email:", email);
          return null; // Password does not match
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}