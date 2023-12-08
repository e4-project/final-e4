import React, { useEffect, useState } from "react";
import ImgSlider from "../ImgSlider";
import { TfiSearch } from "react-icons/tfi";
import Link from "next/link";
import style from "./recruitList.module.css";
import { IRequestRecruitPost } from "@/interfaces/recruit";
import Button from "../common/Button";

/**
 * @name recruit
 * @author 이동훈
 * @prop
 * @desc 모집글 리스트
 */

interface IProps {
  data: IRequestRecruitPost[];
}

const RecruitList = ({ data }: IProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [search, setSearch] = useState<IRequestRecruitPost[]>([]);

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
        <div className={style.btn_wrap}>
          <Link href="/write">
            <Button className={style.registr_btn} text="등록" />
          </Link>
        </div>
        {/* form 만들기*/}
        <form className={style.search} onSubmit={handleSearch}>
          <div className={style.serarch_input}>
            <div className={style.serarch_icon}>
              <TfiSearch size={21} />
            </div>
            <div className={style.input_wrap}>
              <input
                id="text"
                type="text"
                value={keyword}
                placeholder="키워드, 제목, 내용을 검색해보세요."
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>

        <ul className={style.card_wrap}>
          {search.length ? (
            <>
              {search?.map((item: IRequestRecruitPost) => (
                // recruit 리스트 만들기 key는 부모한테만 줘야함
                <li key={item._id}>
                  <Link
                    href={`/recruit/${item.studyName}`}
                    className={style.card_container}
                  >
                    <div>
                      <div className={style.card_keyword}>
                        <div>
                          {item.studyKeyword.split(", ").map((item, idx) => (
                            <div key={idx}>{item}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className={style.materialType}>
                          <p>{item.materialType}</p>
                        </div>
                      </div>
                      <div className={style.card_textbook}>
                        <h2>{item.material}</h2>
                      </div>

                      <div className={style.card_title}>
                        <p>{item.studyName}</p>
                      </div>

                      <div className={style.card_date}>
                        <p>{item.duration}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </>
          ) : (
            <>
              {data?.map((item: IRequestRecruitPost) => (
                // recruit 리스트 만들기 key는 부모한테만 줘야함
                <li key={item._id}>
                  <Link
                    href={`/recruit/${item.studyName}`}
                    className={style.card_container}
                  >
                    <div>
                      <div className={style.card_keyword}>
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
                      <div className={style.card_textbook}>
                        <h2>{item.material}</h2>
                      </div>

                      <div className={style.card_title}>
                        <p>{item.studyName}</p>
                      </div>

                      <div className={style.card_date}>
                      <p>⏱ {item.duration} | {item.deadLine} 모집 마감</p>
                    </div>
                    </div>
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecruitList;
