"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Topbar() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const isNavOpen = searchParams.get("nav") === "open";
  return (
    <header className="z-50 flex items-center gap-2 border-b-2 px-3 py-2 shadow-md">
      <Link className="flex items-center gap-2" href={`?nav=${isNavOpen ? "close" : "open"}`}>
        <Image
          src={session?.user?.image as string}
          alt={session?.user?.name as string}
          width="35"
          height="35"
          className="rounded-full"
        />
        <h2 dir="auto" className="mt-1 font-semibold">
          {session?.user?.name}
        </h2>
      </Link>
    </header>
  );
}
