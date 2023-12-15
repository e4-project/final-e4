import type { Metadata } from "next";
import "./global.css";
import Header from "@/components/common/Header";
import AuthSession from "@/components/AuthSession.tsx/AuthSession";

export const metadata: Metadata = {
  title: "스튜",
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
        <AuthSession>
          <Header />
          {children}
        </AuthSession>
      </body>
    </html>
  );
}
