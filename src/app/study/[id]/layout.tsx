import type { Metadata } from "next";
import { Inter } from "next/font/google";
import style from "./study.module.css";
import React, {useState, useEffect} from 'react';
import Link from "next/link";
import LeftContainer from './page.view';

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
            {/* /study/:studyId/ */}
            <Link className={style.link_menu} href="/study/656e80c0cdf14c2e53084f64">스터디 진도표</Link>
            {/* /study/:studyId/note */}
            <Link className={style.link_menu} href="/study/656e80c0cdf14c2e53084f64/note">공부 노트</Link>
            {/* /study/:studyId/board */}
            <Link className={style.link_menu} href="/study/656e80c0cdf14c2e53084f64/board" >게시판</Link>
            {/* /study/:studyId/introduce */}
            <Link className={style.link_menu} href="/study/656e80c0cdf14c2e53084f64/introduce">스터디 소개</Link>
          </div>
          <div className={style.content_warp}>{children}</div>
      </div>
    </div>
  );
}
