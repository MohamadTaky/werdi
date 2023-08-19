import ReactQueryProvider from "@/lib/ReactQueryProvider";
import { getServerSession } from "@/lib/nextAuth";
import { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { ReactNode } from "react";
import SessionProvider from "../lib/SessionProvider";
import Navbar from "./(index)/components/Navbar";
import Topbar from "./(index)/components/Topbar";
import "./(index)/globals.css";

const font = Noto_Sans_Arabic({ subsets: ["arabic"] });
export const metadata: Metadata = { title: "werdi" };
export default async function RootLayout({ children, auth }: { children: ReactNode; auth: ReactNode }) {
  const session = await getServerSession();
  return (
    <html className="h-fill-available" lang="ar" dir="rtl">
      <body className={`h-full ${font.className} ${session ? "grid grid-rows-[auto_1fr]" : ""}`}>
        {session ? (
          <SessionProvider session={session}>
            <ReactQueryProvider>
              <Topbar />
              <Navbar />
              <main className="scrollbar-rounded relative scroll-m-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-300">
                {children}
              </main>
            </ReactQueryProvider>
          </SessionProvider>
        ) : (
          auth
        )}
      </body>
    </html>
  );
}
