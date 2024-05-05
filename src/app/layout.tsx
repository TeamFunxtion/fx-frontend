import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/reset.css";
import Header from "../components/header/header";
import { Toaster } from 'react-hot-toast';
import RecoilRootWrapper from "@/components/RecoilWrapper";

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
      <body className={pretendard.className}>
        <RecoilRootWrapper>
          <Header />
          <main>
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
