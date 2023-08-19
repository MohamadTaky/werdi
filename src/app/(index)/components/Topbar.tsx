"use client";
import Avatar from "@/components/Avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Topbar() {
  const session = useSession();
  const open = useSearchParams().get("nav") === "open";
  const pathname = usePathname();
  const username = session.data?.user.name!;

  return (
    <header className="z-50 border-b-2 bg-gray-100 px-3 py-2 shadow-md">
      <Link className="flex items-center gap-2 w-fit" href={`${pathname}?nav=${open ? "close" : "open"}`}>
        <Avatar image={session.data?.user.image ?? ""} fallback={username?.slice(0, 2)} />
        <h2 className="mt-1 font-bold">{username}</h2>
      </Link>
    </header>
  );
}
