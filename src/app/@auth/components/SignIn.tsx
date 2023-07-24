"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Button from "@/components/Button";

export default function SignIn({ children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button className="bg-white text-black flex mx-auto" onClick={() => signIn("google")} {...props}>
      تسجيل الدخول باستخدام حساب غوغل
      <Image width="24" height="24" src="/google-logo.svg" alt="google-logo" />
    </Button>
  );
}
