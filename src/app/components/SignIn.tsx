"use client";
import { signIn } from "next-auth/react";

export default function SignIn({ children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
	return <button onClick={() => signIn("google")} {...props}>{children}</button>;
}
