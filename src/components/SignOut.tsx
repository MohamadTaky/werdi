"use client";
import { signOut } from "next-auth/react";

export default function SignOut({ children }: React.HTMLAttributes<HTMLButtonElement>) {
	return <button onClick={() => signOut()}>{children}</button>;
}
