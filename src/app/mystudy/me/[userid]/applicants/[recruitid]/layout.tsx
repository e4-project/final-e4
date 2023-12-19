import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "스튜 | 모집글 신청현황",
  description: "스터디 모집해서 사람들과 같이 스터디해봐요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
