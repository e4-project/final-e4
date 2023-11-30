"use client";

import React, { Dispatch } from 'react';
import style from '@/styles/style.module.css';

interface IProps {
    setModalOpen: Dispatch<React.SetStateAction<boolean>>;
}


export default function Modal ({setModalOpen}: IProps){
    const closeModal = ()=>{
        setModalOpen(false);
    };

    return(
        <div className={style.back}>
            <div className={style.modal}>
                <div className={style.close}>
                    <button onClick={closeModal}>
                        <img src="/icon_cancel.svg" alt="" />
                    </button>
                </div>
                <div className={style.modal_text}>
                    <h2>스터디 참여 신청하기</h2>
                    <p>간단한 자기소개, 스터디를 하려는 이유 등 스터디 소개글을 참고하여 신청글을 작성해주세요</p>
                </div>
                <div className={style.textarea}>
                    <textarea name="" id=""></textarea>
                </div>
                <div className={style.application}>
                    <button>신청하기</button>
                </div>
            </div>
        </div>
    )
} ;

