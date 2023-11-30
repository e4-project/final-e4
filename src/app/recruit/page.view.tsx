"use client";
import React, { use, useState } from "react";
import { IRecruit } from "@/models/recruit";
import style from "../../styles/recruit.module.css";
import { TfiSearch } from "react-icons/tfi";
import ImgSlider from "@/components/ImgSlider";


/**
 * @name recruit
 * @author 이동훈
 * @prop
 * @desc 모집글 리스트
 */

interface IProps {
  data: IRecruit[];
  children?: React.ReactNode;
}

const RecruitView = (props: IProps) => {
  const { data } = props;
  return (
    <div className={style.container}>
      <div className={style.banner_slide_wrap}>
        <div className={style.banner_slide_container}>
          <ImgSlider />
        </div>
      </div>
      <div className={style.recruit_wrap}>
        <form className={style.search}>
          <div className={style.serarchicon}>
            <TfiSearch size={21} />
          </div>
          <input type="text" placeholder="키워드, 제목, 내용을 검색해보세요." />
        </form>
        <ul className={style.card_wrap}>
          {data.map((item: IRecruit) => (
            <li key={item.id} className={style.card_container}>
              <a href="/">
                <div className={style.card_keyword} key={item.id}>
                  {item.cal}
                </div>

                <div className={style.card_top}>
                  <p key={item.id}>{item.Choice}</p>
                  <div className={style.textbook_title} key={item.id}>
                    {item.textbook}
                  </div>
                </div>

                <div className={style.card_bottom}>
                  <div className={style.card_title}>
                    <span key={item.id}>{item.title}</span>
                  </div>

                  <div className={style.card_date}>
                    <span key={item.id}>{item.date}</span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecruitView;
