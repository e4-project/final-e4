"use client";
import style from '@/styles/style.module.css';
import React, { Dispatch } from 'react';

interface IProps {
    children : React.ReactNode;
    setModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomModal ({children, setModalOpen}:IProps){
    
    const closeModal = ()=>{
        setModalOpen(false);
    };

    return(
        <div className={style.back}>
            <div className={style.modal}>
                <div className={style.close}>
                    <button onClick={closeModal}>
                        <img src="/icons/icon_cancel.svg" alt="" />
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
};


