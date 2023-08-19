"use client";
import { signIn } from "next-auth/react";
import GoogleLogo from "public/google-logo.svg";
import Image from "next/image";
import Button from "@/components/Button";

export default function SignIn({ children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button className="mx-auto flex bg-white text-black" onClick={() => signIn("google")} {...props}>
      تسجيل الدخول باستخدام حساب غوغل
      <Image width="24" height="24" src={GoogleLogo} alt="google-logo" />
    </Button>
  );
}
