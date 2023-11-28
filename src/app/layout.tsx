import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/styles/global.css'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e4",
  description: "스터디 모집해서 사람들과 같이 스터디해봐요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/* 공통 컴포넌트 */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
