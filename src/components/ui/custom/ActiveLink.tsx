"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { Button } from "../Button";

export default function ActiveLink({ href, children, ...props }: PropsWithChildren<LinkProps>) {
  const pathname = usePathname();
  return (
    <Button
      asChild
      variant="ghost"
      className={`rounded-none" w-full justify-start gap-2 ${
        pathname === href ? "text-blue-500 hover:text-blue-500" : ""
      }`}
    >
      <Link href={href} {...props}>
        {children}
      </Link>
    </Button>
  );
}
