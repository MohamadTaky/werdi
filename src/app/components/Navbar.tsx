"use client";
import { HTMLAttributes } from "react";
import { House, SignOut as SignOutIcon } from "@/components/icons";
import SignOut from "./SignOut";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOpen = searchParams.get("nav") === "open";
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-default bg-black opacity-30"
            onClick={() => router.back()}
          >
            <Link className="" href="?nav=close" />
          </motion.div>
          <motion.nav
            transition={{ ease: "easeInOut" }}
            initial={{ translateX: "100%" }}
            animate={{ translateX: 0 }}
            exit={{ translateX: "100%" }}
            className="absolute inset-0 w-2/3 bg-gray-200 md:w-52"
          >
            <Link className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-300" href="/">
              <House size="24" />
              <span>الرئيسة</span>
            </Link>
            <SignOut className="flex w-full cursor-pointer items-center gap-2 p-2 hover:bg-gray-300">
              <SignOutIcon size="24" />
              <span>تسجيل الخروج</span>
            </SignOut>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

function Item({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}
