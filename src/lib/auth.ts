// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { compare } from "bcryptjs";
// import {prisma} from "@/lib/prisma";
// import { loginSchema } from "@/lib/zod-schemas";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   pages: {
//     signIn: "/auth/login",
//     signOut: "/auth/logout",
//     error: "/auth/error",
//     // newUser: '/auth/register', // Uncomment if you want to redirect to a registration page after successful signup
//   },
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         // Validate credentials with Zod
//         const parsedCredentials = loginSchema.safeParse(credentials);

//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;

//           // Find user by email
//           const user = await prisma.user.findUnique({
//             where: { email },
//           });

//           // If no user or password doesn't match
//           if (!user || !user.password) return null; // No user found or password not set (e.g., social login user)

//           const passwordsMatch = await compare(password, user.password);

//           if (passwordsMatch) {
//             // Return user object, NextAuth handles session creation
//             return {
//               id: user.id,
//               email: user.email,
//               name: user.name,
//               role: user.role, // Attach role to the user object
//             };
//           }
//         }

//         // Return null if user does not exist or password is wrong
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     // Modify the JWT token to include user role and ID
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     // Add user ID and role to the session
//     async session({ session, token }) {
//       if (token?.id) {
//         session.user.id = token.id as string;
//       }
//       if (token?.role) {
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//     // Redirect logic
//     async redirect({ url, baseUrl }) {
//       // Allows user to be redirected back to the page they were on
//       if (url.startsWith("/")) return `${baseUrl}${url}`;
//       // Allows redirect to other URLs (e.g. for external OAuth providers)
//       else if (new URL(url).origin === baseUrl) return url;
//       return baseUrl;
//     },
//   },
//   // CSRF protection is generally built into NextAuth.js
//   // For manual forms, you might need to implement a custom CSRF token.
//   // NextAuth.js handles it for its own routes.
// });

// // Extend the Session and JWT types for TypeScript
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: string;
//     } & DefaultSession["user"];
//   }

//   interface User {
//     id: string;
//     role: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     role: string;
//   }
// }
