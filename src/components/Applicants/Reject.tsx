"use client";

import Link from "next/link";
import style from "./Applicants.module.css";
import { useState } from "react";

export default function Reject(props: any) {
  const [showAlert, setShowAlert] = useState(false);
  const clickAlert = () => setShowAlert(!showAlert);

  return (
    <div>
      {" "}
      {/* key=[props.i] */}
      <p onClick={clickAlert} className={style.reject_btn}>
        거절
      </p>
      {showAlert && <FeedAlert clickAlert={clickAlert} />}
    </div>
  );
}

const FeedAlert = (props: any) => {
  const { clickAlert } = props;
  return (
    <div onClick={clickAlert} className={style.alert_bg}>
      <div onClick={(e) => e.stopPropagation()} className={style.alert}>
        <p>스터디 참여를 거절할까요?</p>
        <div className={style.btns}>
          <p className={style.cancel_yes_btn}>거절</p>
          {/* 거절 -> onClick={상태를 '거절'로 변경} */}
          <p onClick={clickAlert} className={style.cancel_no_btn}>
            취소
          </p>
        </div>
      </div>
    </div>
  );
};
