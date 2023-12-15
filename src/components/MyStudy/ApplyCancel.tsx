"use client";
import Alert from "../common/Alert/Alert";
import style from "./MyStudy.module.css";
import { useState } from "react";

export default function ApplyCancel(props: any) {
  const [showAlert, setShowAlert] = useState(false);
  const clickAlert = () => setShowAlert(!showAlert);
  const onApplicant = async () => {
    clickAlert()
  }
  return (
    <div>
      {/* key=[props.i] */}
      <p onClick={clickAlert} className={style.apply_cancel_btn}>
        신청 취소
      </p>
      {showAlert && (
        <Alert clickAlert={clickAlert} onCtrl={onApplicant} context="스터디 참여 신청을 취소할까요?"/>
      )}
    </div>
  );
}
