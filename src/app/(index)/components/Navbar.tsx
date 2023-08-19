"use client";
import { Home, LogOut, Users2 } from "lucide-react";
import ActiveLink from "@/components/ActiveLink";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";

export default function Navbar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const isOpen = searchParams.get("nav") === "open";
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[50px] z-20 cursor-default bg-black/50"
            onClick={() => replace(`${pathname}?nav=close`)}
          />
          <motion.nav
            transition={{ ease: "easeInOut" }}
            initial={{ translateX: "100%" }}
            animate={{ translateX: 0 }}
            exit={{ translateX: "100%" }}
            className="fixed inset-0 top-[50px] z-20 h-full w-48 border-2 border-l-gray-300 bg-gray-200 shadow-xl md:w-52"
          >
            <ActiveLink matches={["werd", ""]} href="/">
              <Home /> الرئيسة
            </ActiveLink>
            <ActiveLink matches={["groups"]} href="/groups">
              <Users2 /> المجموعات
            </ActiveLink>
            <Button
              variant="ghost"
              onClick={async () => {
                await signOut();
                replace("/");
              }}
              className="w-full ring-offset-0 hover:bg-gray-300 focus:bg-gray-300 focus:ring-0 active:bg-gray-400"
            >
              <LogOut /> تسجيل الخروج
            </Button>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
