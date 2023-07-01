"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/Avatar";

export default function Topbar() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isNavOpen = searchParams.get("nav") === "open";

  return (
    <header className="sticky top-0 z-50 flex items-center gap-2 border-b-2 bg-gray-100 px-3 py-2 shadow-md">
      <Link className="flex items-center gap-2" href={`${pathname}?nav=${isNavOpen ? "close" : "open"}`}>
        <Avatar>
          <AvatarImage src={session?.user.image as string} />
          <AvatarFallback>{session?.user.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <h2 dir="auto" className="mt-1 text-lg font-bold">
          {session?.user?.name}
        </h2>
      </Link>
    </header>
  );
}
