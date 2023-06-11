import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const authOptions : AuthOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
