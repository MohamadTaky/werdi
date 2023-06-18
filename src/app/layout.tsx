import "./globals.css";
import { Noto_Sans_Arabic } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "../lib/SessionProvider";
import ReactQueryProvider from "@/lib/ReactQueryProvider";

const font = Noto_Sans_Arabic({ subsets: ["arabic"] });
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, auth }: { children: React.ReactNode; auth: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ar" dir="rtl">
      <body className={font.className}>
        {session ? (
          <SessionProvider session={session}>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </SessionProvider>
        ) : (
          auth
        )}
      </body>
    </html>
  );
}
