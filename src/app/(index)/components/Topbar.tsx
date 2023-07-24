"use client";
import * as Avatar from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Topbar() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isNavOpen = searchParams.get("nav") === "open";

  return (
    <header className="sticky top-0 z-50 flex items-center gap-2 border-b-2 bg-gray-100 px-3 py-2 shadow-md">
      <Link className="flex items-center gap-2" href={`${pathname}?nav=${isNavOpen ? "close" : "open"}`}>
        <Avatar.Root className="h-8 w-8 overflow-hidden rounded-full">
          <Avatar.Image src={session?.user.image as string} />
          <Avatar.Fallback delayMs={10000}>{session?.user.name?.slice(0, 2)}</Avatar.Fallback>
        </Avatar.Root>
        <h2 dir="auto" className="mt-1 font-bold">
          {session?.user.name}
        </h2>
      </Link>
    </header>
  );
}
