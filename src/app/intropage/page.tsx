"use client";
import React, { useEffect } from 'react';
import mainstyle from "./mainstyle.module.css"
import "@/styles/global.css";

/**
 * @name header
 * @author 오동주
 * @prop name
 * @desc 인트로페이지
 * @returns number
 */

export default function Mainpage (){
    return(
        <>
        <div className={mainstyle.body}>
            <div className={mainstyle.area1}>
                <div className={mainstyle.sheet}>
                    <div className={mainstyle.left_area}>
                        <h1>스터디 모집을 찾고 계신가요?</h1>
                        <h2>e4에서 새로운 스터디 그룹을 찾아보세요</h2>
                    </div>
                    <div className={mainstyle.right_area}>
                        이미지영역
                    </div>
                </div>
            </div>
            <div className={mainstyle.area2}>
                <div className={mainstyle.sheet}>
                    <div className={mainstyle.left_area}>
                            이미지영역
                    </div>
                    <div className={mainstyle.right_area}>
                        <h1>하고싶은 스터디가 있는데 없다구요?</h1>
                        <h2>e4에서 새로운 스터디원을 모집해 보세요</h2>
                        <p>당신이 
                            <strong> 원하는, 생각하는, 하고싶은</strong>
                            <br />
                            스터디가 없다면 사람들을 모집해 
                            <br />
                            <strong>직접 스터디 그룹을 만들어 보세요</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div className={mainstyle.area3}>
                <ul className={mainstyle.sheet}>
                    <li><p>영역</p></li>
                    <li><p>영역</p></li>
                    <li><p>영역</p></li> 
                </ul>
            </div>
            <div className={mainstyle.footer}>
                <div></div>
                <div>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
        </>
        
    )
    
};
