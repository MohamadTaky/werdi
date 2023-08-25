import prisma, { PrismaClientSingleton } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions, getServerSession as serverSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: CustomPrismaAdapter(prisma as unknown as PrismaClientSingleton),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      httpOptions: {
        timeout: 60000,
      },
    }),
  ],
  callbacks: {
    session: ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    error: "/",
    signIn: "/",
  },
};

export async function getServerSession() {
  return await serverSession(authOptions);
}

function CustomPrismaAdapter(p: PrismaClientSingleton) {
  return PrismaAdapter(p as unknown as PrismaClient);
}
