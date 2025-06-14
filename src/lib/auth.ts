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
    // newUser: '/auth/register', // Uncomment if you want to redirect to a registration page after successful signup
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) return null;

          const passwordsMatch = await compare(password, user.password);

          if (passwordsMatch) {
            // Return user object including the role. This must match your extended `User` interface.
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // user object comes from the authorize function
        token.id = user.id;
        token.role = (user as any).role; // Temporary cast to `any` can sometimes help with strict type checking, but should ideally match the User type fully.
      }
      return token;
    },
    async session({ session, token }) {
      // token object comes from the jwt callback
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

// Extend the Session and JWT types for TypeScript
// These declarations merge with the default types provided by next-auth.
declare module "next-auth" {
  // Extend the default Session interface to include 'id' and 'role' on the 'user' object
  interface Session {
    user: {
      id: string; // Add the user ID
      role: string; // Add the user role
    } & DefaultSession["user"]; // Merge with default session user properties
  }

  // Extend the default User interface to include 'id' and 'role'
  // This type is used internally by NextAuth, particularly in the `authorize` callback
  // and by adapters. Ensure it includes all properties your `User` model has that you want.
  interface User extends DefaultUser {
    id: string; // Ensures `id` is present, although often default
    role: string; // Custom property from your Prisma `User` model
  }
}

declare module "next-auth/jwt" {
  // Extend the default JWT interface to include 'id' and 'role'
  interface JWT {
    id: string; // Add the user ID to the token
    role: string; // Add the user role to the token
  }
}