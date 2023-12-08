import type { Metadata } from "next";
import { Inter } from "next/font/google";
import style from "./study.module.css";
import React, {useState, useEffect} from 'react';
import Link from "next/link";
import LeftContainer from './page.view';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e4 | 스터디방",
};

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={style.main_container}>
      {/* 헤더 부분 */}
      {/* 왼쪽 오른쪽 레이아웃 부분 */}
      <LeftContainer />
        <div className={style.right_container}>
          {/* 여기서 네이게이션바  */}
          <div className={style.link_list}>
            <Link className={style.link_menu} href="/study">스터디 진도표</Link>
            <Link className={style.link_menu} href="/study/note">공부 노트</Link>
            <Link className={style.link_menu} href="/study/board" >게시판</Link>
            <Link className={style.link_menu} href="/study/introduce">스터디 소개</Link>
          </div>
          <div className={style.content_warp}>{children}</div>
      </div>
    </div>
  );
}
