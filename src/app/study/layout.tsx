import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.css";
import style from "./study.module.css";
import React, {useState} from 'react';
import Link from "next/link";
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
    <div className={style.mainContainer}>
      {/* 헤더 부분 */}
      {/* 왼쪽 오른쪽 레이아웃 부분 */}
        <div className={style.leftContainer}>
          <div className={style.leftInfo}>
            <h4 >함께 공부할 강의</h4>
            <p>[코딩애플] React 리액트 기초부터 쇼핑몰 프로젝트까지!</p>
            <div className={style.studyMiniInfo}>
              <p>스터디룸 <button>입장하기</button></p>
              <p>스터디 기간 <span>개월 수</span></p>
              <p>스터디 멤버</p>
            </div>
          </div>
        </div>
        <div className={style.rightContainer}>
          {/* 여기서 네이게이션바  */}
          <div className={style.linkList}>
            <Link className={style.linkMenu} href="/study">스터디 진도표</Link>
            <Link className={style.linkMenu} href="/study/note">공부 노트</Link>
            <Link className={style.linkMenu} href="/study/board" >게시판</Link>
            <Link className={style.linkMenu} href="/study/introduce">스터디 소개</Link>
          </div>
          <div>{children}</div>
      </div>
    </div>
  );
}
