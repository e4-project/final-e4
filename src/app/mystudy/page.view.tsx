'use client';

import Link from 'next/link'
import style from './mystudy.module.css';
import {useState} from 'react';


export default function Apply(props) {
    const [showAlert, setShowAlert] = useState(false)
    const clickAlert = () => setShowAlert(!showAlert)
    {/* const render = () => {
        if (recognition === '거절'){
            return <div>거절됨</div>
        } else if (recognition === '승인'){
            return <div>승인됨</div>
        } else (recognition === '대기'){
            return (
                <p onClick={clickAlert} className={style.apply_cancel_btn}>신청 취소</p>
                {showAlert && <FeedAlert clickAlert={clickAlert} />}
            )
            
        }
    } */}

    return(
            <div className={style.section_item}>  {/* key=[props.i] */}
            
                <Link className={style.study_name}
                href={'/해당recruit post링크'}>
                    <p>recruit post의 studyName</p>
                </Link>
                {/* {render()} */} 

            {/* 아래 버튼은 위에 있는 render 대신 더미버튼,, */}
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