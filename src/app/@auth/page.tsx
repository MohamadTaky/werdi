import SignIn from "./components/SignIn";
import { GoogleLogo } from "@/components/icons";
import Image from "next/image";

export default function AuthPage() {
  return (
    <section className="dark flex h-screen flex-col items-center justify-between p-4">
      <Image
        src="/mosque.jpg"
        alt="mosque"
        fill
        className="absolute left-0 top-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black/20" />
      <h1 className="mt-36 text-center text-6xl font-bold text-white">وِردي</h1>
      <SignIn>
        <span className="md:text-lg">تسجيل الدخول باستخدام حساب غوغل</span>
        <GoogleLogo className="mr-2 text-red-500" weight="bold" size="30" />
      </SignIn>
    </section>
  );
}
