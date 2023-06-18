"use client";
import { signOut } from "next-auth/react";

export default function SignOut({
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button onClick={() => signOut()} {...props}>
      {children}
    </button>
  );
}
