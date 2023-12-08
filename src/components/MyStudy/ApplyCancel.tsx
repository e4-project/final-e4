'use client';

import Link from 'next/link'
import style from './MyStudy.module.css';
import {useState} from 'react';


export default function ApplyCancel(props) {
    const [showAlert, setShowAlert] = useState(false)
    const clickAlert = () => setShowAlert(!showAlert)

    return(
            <div className={style.section_item}>  {/* key=[props.i] */}
                <p onClick={clickAlert} className={style.apply_cancel_btn}>신청 취소</p>
                {showAlert && <FeedAlert clickAlert={clickAlert} />}
            </div>
    )
}


const FeedAlert = (props) => {
    const { clickAlert } = props
    return(
        <div onClick={clickAlert} className={style.alert_bg}>
            <div onClick={(e) => e.stopPropagation()} className={style.alert}>
                <p>스터디 참여 신청을 취소할까요?</p>
                <div className={style.btns}>
                    <p className={style.cancel_yes_btn}>네</p> 
                    {/* 네 -> onClick={applicants에서 내 정보 삭제} */}
                    <p onClick={clickAlert} className={style.cancel_no_btn}>아니오</p>
                </div>
                
            </div> 
        </div>
    )
}