"use client"
import React from 'react';
import style from "./study.module.css";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const RightContainer = ({id, children}: any) => {
    const pathname = usePathname();

    return (
        <div className={style.right_container}>
            {/* 여기서 네이게이션바  */}
            <div className={style.link_list}>
                {/* /study/:studyId/ */}
                <Link className={`${style.link_menu} ${pathname === `/study/${id}` ? style.active_link : ''}`} href={`/study/${id}`}>
                스터디 진도표
                </Link>
                {/* /study/:studyId/note */}
                <Link className={`${style.link_menu} ${pathname === `/study/${id}/note` ? style.active_link : ''}`} href={`/study/${id}/note`}>
                공부 노트
                </Link>
                {/* /study/:studyId/board */}
                <Link className={`${style.link_menu} ${pathname === `/study/${id}/board` ? style.active_link : ''}`} href={`/study/${id}/board`}>
                게시판
                </Link>
                {/* /study/:studyId/introduce */}
                <Link className={`${style.link_menu} ${pathname === `/study/${id}/introduce` ? style.active_link : ''}`} href={`/study/${id}/introduce`}>
                스터디 소개
                </Link>
            </div>
            <div className={style.content_warp}>{children}</div>
        </div>
    )
}

export default RightContainer;