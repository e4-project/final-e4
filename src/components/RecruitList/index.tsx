import React from "react";
import ImgSlider from "../common/Slider/ImgSlider";
import { TfiSearch } from "react-icons/tfi";
import { IRecruit } from "@/interfaces/recruit_list";
import Link from "next/link";
import style from "./recruitList.module.css";
import Button from "../common/Button";

/**
 * @name recruitlist
 * @author 이동훈
 * @prop 등록한 페이지 모집글 리스트 출력
 */

const RecruitList = ({ data }: any) => {
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
              <input
                id="text"
                type="text"
                name="focus"
                placeholder="키워드, 제목, 내용을 검색해보세요."
              />
            </div>
          </div>
          <div>
            <Link href="/write">
              <Button className={style.registr_btn} text="등록" />
            </Link>
          </div>
        </form>

        <ul className={style.card_wrap}>
          {data.map((item: IRecruit) => (
            // recruit 리스트 만들기 key는 부모한테만 줘야함
            <li key={item.id} className={style.card_container}>
              <Link href="/recruit">
                <div className={style.card_keyword}>
                  <p>{item.cal}</p>
                </div>
                <div className={style.card_choice}>
                  <p>{item.Choice}</p>
                </div>

                <div className={style.card_textbook}>
                  <h2>{item.textbook}</h2>
                </div>

                <div className={style.card_title}>
                  <p>{item.title}</p>
                </div>

                <div className={style.card_date}>
                  <p>{item.date}</p>
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
