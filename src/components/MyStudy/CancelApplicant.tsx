"use client";
import Alert from "../common/Alert/Alert";
import style from "./MyStudy.module.css";
import { useState } from "react";

interface Iprop {
  userId: string;
  recruitId: string
  onCancel: (userId: string, recruitId: string) => void;
}

export default function CancelApplicant({ userId, recruitId, onCancel }: Iprop) {
  const [showAlert, setShowAlert] = useState(false);
  const clickAlert = () => setShowAlert(!showAlert);
  const onCancelApplicant = async () => {
    // 취소 로직
    onCancel(userId, recruitId)
    clickAlert();
  };
  return (
    <>
      {/* key=[props.i] */}
      <span onClick={clickAlert} className={style.apply_cancel_btn}>
        신청 취소
      </span>
      {showAlert && (
        <Alert
          clickAlert={clickAlert}
          onCtrl={onCancelApplicant}
          context="스터디 참여 신청을 취소할까요?"
        />
      )}
    </>
  );
}
