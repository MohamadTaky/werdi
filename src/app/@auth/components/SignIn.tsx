"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export default function SignIn({ children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button onClick={() => signIn("google")} {...props}>
      {children}
    </Button>
  );
}
