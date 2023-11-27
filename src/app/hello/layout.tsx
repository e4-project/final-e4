import StyledComponentsRegistry from "@/libs/StyleComponentsRegistry";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "e4 | hello",
  description: "스터디 모집해서 사람들과 같이 스터디해봐요",
};

export default function HelloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 공통 컴포넌트 */}
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </>
  );
}
