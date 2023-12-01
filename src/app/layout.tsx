import type { Metadata } from "next";
import "@/styles/global.css";
import Header from "@/components/common/Header";

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
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
