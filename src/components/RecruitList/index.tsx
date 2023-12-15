import React, { use, useCallback, useMemo, useState } from "react";
import ImgSlider from "../ImgSlider";
import { TfiSearch } from "react-icons/tfi";
import Link from "next/link";
import { IResponseRecruitPost } from "@/interfaces/recruit";
import Button from "../common/Button";
import style from "./recruitList.module.css";
import dayjs from "dayjs";
import { isDeadLine } from "@/utils/isDeadLine";
import { useInView } from "react-intersection-observer";
import FilteringBtnItem from "./FilteringBtnItem";

/**
 * @name recruit
 * @author 이동훈
 * @prop
 * @desc 모집글 리스트
 */

interface IProps {
  data: IResponseRecruitPost[];
}

const RecruitList = ({ data }: IProps) => {
  const [keyword, setKeyword] = useState<string>("");  
  const [search, setSearch] = useState<IResponseRecruitPost[]>([]);
  
  const [ref, isView] = useInView({
    threshold: 0.5,
    initialInView: true,
  });

  //TOP 버튼
  const onScrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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

  //정렬 - 최신순
  const onLatestKeyword = useCallback((active: boolean) => {
    console.log({active})
    const sortedData = data
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setSearch(sortedData);  
    console.log("최신순", sortedData);
  }, [data]);

  //정렬 - 관심순

  //정렬 - 마감 임박순
  const onDeadlineKeyword = useCallback((active: boolean) => {
    console.log({active})
    const sortedData = data
      .slice()
      .sort((c, d) => {
        const cTime = isDeadLine(new Date(c.deadLine).getTime()) ? 0 : new Date(c.createdAt).getTime();
        const dTime = isDeadLine(new Date(d.deadLine).getTime()) ? 0 : new Date(d.createdAt).getTime();
        return dTime - cTime;
      })
      setSearch(sortedData);  
    console.log("마감 임박순", sortedData);
    active ? setSearch(sortedData) : setSearch(data)
  }, [data]);
  const btnTextItem = useMemo(
    () => [
      { id: 1, text: "최신순", onHandler: onLatestKeyword},
      { id: 2, text: "관심순", onHandler: null},
      { id: 3, text: "마감 임박순", onHandler: onDeadlineKeyword },
    ],
    [onDeadlineKeyword]
  );

  return (
    <div className={style.container}>
      {/* 배너 만들기 */}
      <div className={style.area}>
        <div className={style.banner_slide_wrap} ref={ref}>
          <div className={style.banner_slide_container}>
            <ImgSlider />
          </div>
        </div>
        <div className={style.recruit_wrap}>
          <div className={style.ctrl_wrap}>
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
                    name="search"
                    placeholder="키워드, 제목, 내용을 검색해보세요."
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>

            <div className={style.btn_wrap}>
              <Link href="/recruit/write">
                <Button className={style.registr_btn} text="스터디 등록" />
              </Link>
            </div>
          </div>

          <div className={style.Kategorie}>
            <ul>
              {btnTextItem.map((btn) => (
                <FilteringBtnItem
                  key={btn.id}
                  {...btn}
                />
              ))}
            </ul>
          </div>

          <ul className={style.card_wrap}>
            {search.length ? (
              <>
                {search?.map((item: IResponseRecruitPost) => (
                  // recruit 리스트 만들기 key는 부모한테만 줘야함
                  <li className={style.card} key={item._id}>
                    <Link
                      href={`/recruit/${item._id}`}
                      className={style.card_container}
                    >
                      <div>
                        <div className={style.card_top_container}>
                          <div className={style.studyKeyword}>
                            <div>
                              {item.studyKeyword
                                .split(", ")
                                .map((item, idx) => (
                                  <span
                                    className={style.studyKeyword_back}
                                    key={idx}
                                  >
                                    {item}
                                  </span>
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
                            <p>
                              ⏱ {item.duration} |{" "}
                              {dayjs(item?.deadLine).format("MM/DD/YYYY")}{" "}
                              {isDeadLine(new Date(item?.deadLine).getTime())
                                ? "모집 마감"
                                : "모집중"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <>
                {data?.map((item: IResponseRecruitPost) => (
                  // recruit 리스트 만들기 key는 부모한테만 줘야함
                  <li className={style.card} key={item._id}>
                    <Link
                      href={`/recruit/${item._id}`}
                      className={style.card_container}
                    >
                      <div>
                        <div className={style.card_top_container}>
                          <div className={style.studyKeyword}>
                            <>
                              {item.studyKeyword
                                .split(", ")
                                .map((item, idx) => (
                                  <span
                                    className={style.studyKeyword_back}
                                    key={idx}
                                  >
                                    {item}
                                  </span>
                                ))}
                            </>
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
                            <p>
                              ⏱ {item.duration} |{" "}
                              {dayjs(item?.deadLine).format("MM/DD/YYYY")}{" "}
                              {isDeadLine(new Date(item?.deadLine).getTime())
                                ? "모집 마감"
                                : "모집중"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
        {/* TOP 버튼 */}
        <div className={style.scroll}>
          {!isView && (
            <button className={style.top_button} onClick={onScrollTop}>
              <span></span>
              <span></span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruitList;
