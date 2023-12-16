"use client";
import style from "./Applicants.module.css";
import { useState } from "react";

interface IProps {
  userId: string;
  studyId: string;
  onApprove: (applicantId: string, studyId: string) => void;
}

export default function Approve({ userId, studyId, onApprove }: IProps) {
  const [showAlert, setShowAlert] = useState(false);
  const clickAlert = () => setShowAlert(!showAlert);

  return (
    <div>
      {/* key=[props.i] */}
      <p onClick={clickAlert} className={style.approve_btn}>
        승인
      </p>
      {showAlert && (
        <FeedAlert
          userId={userId}
          studyId={studyId}
          clickAlert={clickAlert}
          onApprove={onApprove}
        />
      )}
    </div>
  );
}

const FeedAlert = (props: any) => {
  const { userId, studyId, clickAlert, onApprove } = props;

  return (
    <div onClick={clickAlert} className={style.alert_bg}>
      <div onClick={(e) => e.stopPropagation()} className={style.alert}>
        <p>스터디 참여를 승인할까요?</p>
        <div className={style.btns}>
          <p
            onClick={() => {
              onApprove(userId, studyId);
              clickAlert();
            }}
            className={style.approve_yes_btn}
          >
            승인
          </p>
          {/* 승인 -> onClick={상태를 '승인'으로 변경} */}
          <p onClick={clickAlert} className={style.cancel_no_btn}>
            취소
          </p>
        </div>
      </div>
    </div>
  );
};
