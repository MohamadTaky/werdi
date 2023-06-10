"use client";
import { signIn } from "next-auth/react";

export default function SignIn({ children }: React.HTMLAttributes<HTMLButtonElement>) {
	return <button onClick={() => signIn("google")}>{children}</button>;
}
