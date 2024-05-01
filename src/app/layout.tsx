import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/reset.css";
import Header from "../components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Funxtion",
    default: "Fun한 경매 ! Funxtion"
  },
  description: "Fun한 경매! Funxtion",
  icons: {
    icon: "/favicon.ico"
  }
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
