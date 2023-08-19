"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import Button from "./Button";

type ActiveLinkProps = PropsWithChildren<LinkProps> & { matches?: string[] };

export default function ActiveLink({ href, matches, children, ...props }: ActiveLinkProps) {
  const pathname = usePathname();
  const active = matches?.includes(pathname.split("/")[1]);
  return (
    <Button asChild variant="ghost" shape="box" className="ring-offset-0 focus:ring-0">
      <Link className={`w-full ${active ? "text-blue-500 hover:text-blue-500" : ""}`} href={href} {...props}>
        {children}
      </Link>
    </Button>
  );
}
