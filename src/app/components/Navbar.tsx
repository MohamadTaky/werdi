"use client";
import { House, SignOut as SignOutIcon, Users } from "@/components/icons";
import ActiveLink from "@/components/ui/custom/ActiveLink";
import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const searchParams = useSearchParams();
  const { back, replace } = useRouter();
  const isOpen = searchParams.get("nav") === "open";
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 cursor-default bg-black opacity-30"
            onClick={() => back()}
          >
            <Link className="" href="?nav=close" />
          </motion.div>
          <motion.nav
            transition={{ ease: "easeInOut" }}
            initial={{ translateX: "100%" }}
            animate={{ translateX: 0 }}
            exit={{ translateX: "100%" }}
            className="absolute inset-0 z-30 w-2/3 bg-gray-200 md:w-52"
          >
            <ActiveLink href="/">
              <House size="24" /> الرئيسة
            </ActiveLink>
            <ActiveLink href="/groups">
              <Users size="24" /> المجموعات
            </ActiveLink>
            <Button
              onClick={async () => {
                await signOut();
                replace("/");
              }}
              variant="ghost"
              className="w-full justify-start gap-2 rounded-none"
            >
              <SignOutIcon size="24" /> تسجيل الخروج
            </Button>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
