import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "NeuGameHub - AI 게임 플랫폼",
  description:
    "AI로 만든 게임들을 한 곳에서 플레이하세요. 다양한 장르의 AI 개발 게임을 발견하고 즐기세요.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased bg-steam-dark text-steam-text">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
