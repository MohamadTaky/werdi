import { getServerSession } from "@/lib/nextAuth";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
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
      <body className={`h-full ${font.className}`}>
        {session ? (
          <SessionProvider session={session}>
            <ReactQueryProvider>
              <main className="grid h-full grid-rows-[auto_1fr]">
                <Topbar />
                <section className="scrollbar-rounded relative flex scroll-m-4 flex-col overflow-auto p-3 scrollbar-thin scrollbar-thumb-gray-300">
                  <Navbar />
                  {children}
                </section>
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
