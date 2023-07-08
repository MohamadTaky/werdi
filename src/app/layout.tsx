import { getServerSession } from "@/lib/nextAuth";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import { Noto_Sans_Arabic } from "next/font/google";
import SessionProvider from "../lib/SessionProvider";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import "./globals.css";

const font = Noto_Sans_Arabic({ subsets: ["arabic"] });
export const metadata = {
  title: "werdi",
};

export default async function RootLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="ar" dir="rtl">
      <body className={font.className}>
        {session ? (
          <SessionProvider session={session}>
            <ReactQueryProvider>
              <main className="grid h-screen grid-rows-[auto_1fr]">
                <Topbar />
                <div className="relative flex w-screen flex-col p-3">
                  <Navbar />
                  {children}
                </div>
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
