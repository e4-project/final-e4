"use client";
import React, {useState} from 'react';
import style from './studyNav.module.css'
import Link from 'next/link';

/**
 * @name StudyNav
 * @author 문태랑
 * @prop name
 * @desc 스터디 기본 레이아웃
 * @returns number
 */

const StudyNav = () => {
    const [selectMenu, setSelectMenu] = useState<string>('progress');

    const onMenuClick = (menu:string) => {
        setSelectMenu(menu);
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.rightContainer}>
                {/* <div className={style.linkList}>
                    <Link href='/study/progress' onClick={() => onMenuClick('progress')}>스터디 진도표</Link>
                    <Link href='/study/note' onClick={() => onMenuClick('note')}>공부 노트</Link>
                    <Link href='/study/board' onClick={() => onMenuClick('board')}>게시판</Link>
                    <Link href='/study/introduce' onClick={() => onMenuClick('introduce')}>스터디 소개</Link>
                </div> */}
                {/* <div className={style.menuContent}>   
                    {selectMenu === 'progress' && <progress />}
                    {selectMenu === 'note' && <Note />}
                    {selectMenu === 'board' && <Board />}
                    {selectMenu === 'introduce' && <Introduce />}
                </div> */}
            </div>
        </div>
    )
}

export default StudyNav;