import SignIn from "./components/SignIn";
import Image from "next/image";

export default function AuthPage() {
  return (
    <section className="dark flex h-full flex-col justify-between p-4">
      <Image
        src="/mosque.jpg"
        alt="mosque"
        width="1920"
        height="1097"
        className="absolute left-0 top-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black/30" />
      <h1 className="mt-36 text-center text-6xl font-bold text-white">وِردي</h1>
      <SignIn />
    </section>
  );
}
