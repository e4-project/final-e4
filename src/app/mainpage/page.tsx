"use client";
import mainstyle from "./mainstyle.module.css"
import "@/styles/global.css";


export default function Mainpage (){
    return(
        <div className={mainstyle.body}>
            <div className={mainstyle.area1}>
                <ul className={mainstyle.sheet}>
                   <li><p>영역</p></li>
                   <li><p>영역</p></li>
                   <li><p>영역</p></li> 
                </ul>
            </div>
            <div className={mainstyle.area2}>
                <div className={mainstyle.sheet}>
                    <div>
                        <h2>스터디 모집을 찾고 계신가요?</h2>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
};