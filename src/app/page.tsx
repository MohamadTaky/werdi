import Topbar from "@/app/components/Topbar";
import Navbar from "@/app/components/Navbar";
import { Plus } from "@/components/icons";
import Link from "next/link";
import WerdList from "@/app/components/WerdList";

export default async function Home() {
  return (
    <main className="grid h-screen grid-rows-[auto_1fr]">
      <Topbar />
      <div className="relative">
        <Navbar />
        {/* @ts-ignore */}
        <WerdList />
        <Link
          href="/add"
          className="fixed bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-gray-300 bg-gray-100 p-2 shadow hover:bg-gray-200"
        >
          <Plus size="24" weight="bold" />
        </Link>
      </div>
    </main>
  );
}
