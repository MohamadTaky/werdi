import SignIn from "@/app/components/SignIn";
import { GoogleLogo } from "@/components/icons";

export default function AuthPage() {
  return (
    <>
      <h1 className="pt-24 text-center text-6xl">وِردي</h1>
      <SignIn className="mx-auto mt-48 flex w-fit items-center gap-2 rounded-md border-2 border-gray-300 bg-gray-100 p-2 shadow-md shadow-black/30 transition-colors hover:bg-gray-200">
        <span className="text-lg">تسجيل الدخول باستخدام حساب غوغل</span>
        <GoogleLogo className="text-red-500" weight="bold" size="30" />
      </SignIn>
    </>
  );
}
