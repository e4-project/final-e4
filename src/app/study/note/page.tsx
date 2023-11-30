"use client";
import React,{useState} from 'react';
import style from './note.module.css';

/**
 * @name note
 * @author 문태랑
 * @prop name
 * @desc 공부 노트 페이지
 * @returns number
 */

const Page = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [selectWeek, setSelectWeek] = useState<number | null>(null);

    const onButtonClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const onMenuClick = (week: number) => {
        setSelectWeek(week);
        setIsMenuOpen(false);
    };

    return (
        <div className={style.noteContainer}>
            <div className={style.weekWriteContainer}>
                <button onClick={onButtonClick}>
                    {selectWeek ? `${selectWeek}주차` : '주차 선택'}
                </button>
                    {isMenuOpen && (
                        <ul>
                            {[1, 2, 3, 4].map((week) => (
                            <li key={week} onClick={() => onMenuClick(week)}>
                            {week}주차
                            </li>
                        ))}
                        </ul>
                    )}
            </div>
            <button>학습 노트 작성하기</button>
        </div>
    )
}

export default Page;
