import React, { useEffect, useState } from "react";
import ImgSlider from "../ImgSlider";
import { TfiSearch } from "react-icons/tfi";
import Link from "next/link";
import style from "./recruitList.module.css";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import Button from "../common/Button";

/**
 * @name recruit
 * @author 이동훈
 * @prop
 * @desc 모집글 리스트
 */

interface IProps {
  data: IResponseRecruitPost[]
}

const RecruitList = ({ data }: IProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [search, setSearch] = useState<IResponseRecruitPost[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const inputValue = keyword.toLowerCase();
    const filteredResults = data.filter(
      (data) =>
        data.studyName.toLowerCase().includes(inputValue) ||
        data.materialType.toLowerCase().includes(inputValue) ||
        data.material.toLowerCase().includes(inputValue)
    );
    setSearch(filteredResults);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

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
              <input className={style.input_text}
                id="text"
                type="text"
                name="focus"
                placeholder="키워드, 제목, 내용을 검색해보세요."
              />
            </div>
          </div>
          <div>
            <Link href="/write">
              <p className={style.write_btn}>스터디 등록</p>
              {/* <Button className={style.registr_btn} text="등록" /> */}
            </Link>
          </div>
        </form>
        <ul className={style.card_wrap}>
          {data?.map((item: IResponseRecruitPost) => (
            // recruit 리스트 만들기 key는 부모한테만 줘야함
            <li key={item._id}>
              <Link href={`/recruit/${item.studyName}`} className={style.card_container}>
                <div>
                  <div className={style.card_top_container}>
                    <div className={style.studyKeyword}>
                      <div>
                        {item.studyKeyword.split(", ").map((item, idx) => (
                          <div key={idx}>{item}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                        <div className={style.materialType}>
                          <p>📖 {item.materialType}</p>
                        </div>
                    </div>

                    <div className={style.material}>
                      <p>{item.material}</p>
                    </div>
                  </div>
                  <div className={style.card_bottom_container}>
                    <div className={style.studyName}>
                      <p>{item.studyName}</p>
                    </div>

                    <div className={style.card_date}>
                      <p>⏱ {item.duration} | {item.deadLine} 모집 마감</p>
                    </div>

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
