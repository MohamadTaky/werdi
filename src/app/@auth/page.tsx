import Image from "next/image";
import MosqueImage from "public/mosque.jpg";
import SignIn from "./components/SignIn";

export default function AuthPage({ searchParams: { error } }: { searchParams: { error: string } }) {
  return (
    <section className="dark flex h-full flex-col items-center justify-between gap-4 p-4">
      <Image src={MosqueImage} alt="" className="absolute inset-0 -z-50 h-full w-full object-cover" />
      <div className="absolute left-0 top-0 -z-40 h-full w-full bg-black/30" />
      <h1 className="mt-36 text-center text-6xl font-bold text-white">وِردي</h1>
      {error && <p className="mt-auto text-red-400">حدث خطأ أثناء تسجيل الدخول, يرجى إعادة المحاولة</p>}
      <SignIn />
    </section>
  );
}
