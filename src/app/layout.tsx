import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/reset.css";
import Header from "../components/header/header";
import { Toaster } from 'react-hot-toast';
import RecoilRootWrapper from "@/components/RecoilWrapper";
import Head from "next/head";
import Link from 'next/link'
import UserRefresh from "@/components/UserRefresh";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Funxtion",
    default: "Fun한 경매! Funxtion"
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
      <Head>
        {/* 스크롤 위치 기억하도록 설정 (+ next.config.js) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </Head>
      <body className={pretendard.className}>
        <RecoilRootWrapper>
          <Header />
          <div style={{ position: 'fixed', right: 100, top: 200, cursor: 'pointer' }}>
            <Link href="/notice"><img style={{ width: '85px', height: '85px' }} src="/images/helpcenter.png" alt="" /></Link>
          </div>
          <main>
            <UserRefresh />
            {children}
          </main>
          <Toaster
            position="bottom-center"
            toastOptions={{
              success: {
                style: {
                  background: '#00D26A',
                  color: 'white',
                },
                iconTheme: {
                  primary: 'white',
                  secondary: '#00D26A',
                }
              },
              error: {
                style: {
                  background: 'red',
                  color: 'white',
                },
                iconTheme: {
                  primary: 'white',
                  secondary: 'red',
                }
              },
            }}
            containerStyle={{
              bottom: 50
            }}
          />
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
