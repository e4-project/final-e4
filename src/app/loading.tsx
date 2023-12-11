import React from "react";
import style from "./loadingstyle.module.css"
const Loading = () => {
  // 공통 로딩중 기능 구현하기
  return(
    <div className={style.loading_frame}>
        <span className={style.boll}></span>
        <span className={style.boll}></span>
        <span className={style.boll}></span>
    </div>
  )
};

export default Loading;
