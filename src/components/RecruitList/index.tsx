import React from "react";
import ImgSlider from "../ImgSlider";
import { TfiSearch } from "react-icons/tfi";
import { IRecruit } from "@/interfaces/recruit";
import Link from "next/link";
import style from "./recruitList.module.css";

/**
 * @name recruit
 * @author 이동훈
 * @prop
 * @desc 모집글 리스트
 */

const RecruitList = ({ data }: any) => {
  console.log(data);

  return (
    <div className={style.container}>
      {/* 배너 만들기 */}
      <div className={style.banner_slide_wrap}>
        <div className={style.banner_slide_container}>
          <ImgSlider />
        </div>
      </div>
      <div className={style.recruit_wrap}>
        {/* form 만들기*/}
        <form className={style.search}>
          <div className={style.serarch_input}>
            <div className={style.serarch_icon}>
              <TfiSearch size={21} />
            </div>
            <div className={style.input_wrap}>
              <label className="" htmlFor="text">
                <input
                  id="text"
                  type="text"
                  placeholder="키워드, 제목, 내용을 검색해보세요."
                />
              </label>
            </div>
          </div>
        </form>

        <ul className={style.card_wrap}>
          {data.map((item: IRecruit) => (
            // recruit 리스트 만들기 key는 부모한테만 줘야함
            <li key={item.id} className={style.card_container}>
              <Link href="/recruit">
                <div className={style.card_keyword}>{item.cal}</div>

                <div className={style.card_top}>
                  <p>{item.Choice}</p>
                  <div className={style.textbook_title}>{item.textbook}</div>
                </div>

                <div className={style.card_bottom}>
                  <div className={style.card_title}>
                    <span>{item.title}</span>
                  </div>

                  <div className={style.card_date}>
                    <span>{item.date}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecruitList;
