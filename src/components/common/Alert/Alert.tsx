import React from "react";
import style from "./Alert.module.css";

interface IAlert {
  context: string;
  clickAlert: () => void;
  onCtrl: () => void;
}

const Alert = ({ context, clickAlert, onCtrl }: IAlert) => {
  return (
    <div onClick={clickAlert} className={style.alert_bg}>
      <div onClick={(e) => e.stopPropagation()} className={style.alert}>
        <p>{context}</p>
        <div className={style.btns}>
          <button className={style.cancel_yes_btn} onClick={onCtrl}>
            네
          </button>
          {/* 네 -> onClick={applicants에서 내 정보 삭제} */}
          <button onClick={clickAlert} className={style.cancel_no_btn}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
