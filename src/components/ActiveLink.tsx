"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import Button from "./Button";

export default function ActiveLink({ href, children, ...props }: PropsWithChildren<LinkProps>) {
  const pathname = usePathname();
  const active = pathname.split("/")[1] === href.toString().slice(1);
  return (
    <Button asChild variant="ghost">
      <Link
        onClick={() => console.log(href)}
        className={`w-full hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 ${
          active ? "text-blue-500 hover:text-blue-500" : ""
        }`}
        href={href}
        {...props}
      >
        {children}
      </Link>
    </Button>
  );
}
