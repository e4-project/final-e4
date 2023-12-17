"use client";
import Alert from "../common/Alert/Alert";
import style from "./MyStudy.module.css";
import { useState } from "react";

interface Iprop {
  context: string;
  alertText: string;
}

export default function ApplyAlert({context, alertText}: Iprop) {
  const [showAlert, setShowAlert] = useState(false);
  const clickAlert = () => setShowAlert(!showAlert);
  const onApplicant = async () => {
    clickAlert()
  }
  return (
    <div>
      {/* key=[props.i] */}
      <p onClick={clickAlert} className={style.apply_cancel_btn}>
        {alertText}
      </p>
      {showAlert && (
        <Alert clickAlert={clickAlert} onCtrl={onApplicant} context={context}/>
      )}
    </div>
  );
}
