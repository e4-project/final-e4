import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.css";
import style from "./study.module.css";
import React, {useState} from 'react';
import Link from "next/link";
import testDummy from '@/dummy/studydata.json';
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
        <div className={style.left_container}>
          <div className={style.left_info}>
            <h4 >함께 공부할 강의</h4>
            <p>[코딩애플] React 리액트 기초부터 쇼핑몰 프로젝트까지!</p>
            <div className={style.study_mini_info}>
              <p className={style.study_room}>스터디룸 
                <button className={style.Entrance}>
                  <span>드과자</span>
                  <span>입장하기</span>
                </button>
              </p>
              <p>스터디 기간 <span>{testDummy.period.map(period =>(
                <span key={period.id}>{period.content}</span>
              ))}</span></p>
              <p>스터디 멤버 <span>{testDummy.member.map(member =>(
                <p key={member.id}>{member.content} </p>
              ))}</span></p>
            </div>
          </div>
        </div>
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
