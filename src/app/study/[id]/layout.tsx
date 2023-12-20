import type { Metadata } from "next";
import style from "./study.module.css";
import Link from "next/link";
import LeftContainer from "./page.view";
import RightContainer from "./right.page";

export const metadata: Metadata = {
  title: "스튜 | 스터디방",
};

export default function StudyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  const { id } = params;

  return (
    <div className={style.main_container}>
      {/* 헤더 부분 */}
      {/* 왼쪽 오른쪽 레이아웃 부분 */}
      <div className={style.area}>
        <LeftContainer />
        <RightContainer id={id} >{children}</RightContainer>
      </div>
    </div>
  );
}