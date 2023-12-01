"use client";
import React, { FormEvent, useState } from "react";
import style from "./Write.module.css";
import DatePicker from "react-datepicker";

const WriteForm = () => {
  // 선택된 날짜를 관리하는 상태 변수를 선언하고 초기값을 현재 날짜로 설정
  const [selectedDate, setSelectedDate] = useState(new Date());
  // 폼 제출 이벤트를 처리하는 함수
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const response = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
    } else {
      console.error("서버 오류:", response.status, response.statusText);
    }
  };
  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit} action="/api/hello" method="POST">
        <h1 className={style.title}>스터디에 사용될 교재 정보를 알려주세요!</h1>

        <div className={style.mb120}>
          <h4 className={style.text}>
            함께 공부할 강의/수업/책 등 교재의 이름
          </h4>
          <input type="text" name="item_name" className={style.inputBox__L} />
          <div className={style.flex}>
            <div className={style.mt35}>
              <h4 className={style.text}>교재 정보를 알 수 있는 페이지 링크</h4>
              <input
                type="text"
                name="page_link"
                className={style.inputBox__S}
              />
            </div>
            <div className={style.mt35}>
              <h4 className={style.text}>교재 유형</h4>
              <select name="item_type" className={style.inputBox__S}>
                <option value="video">동영상 강의</option>
                <option value="book">책</option>
                <option value="online">온라인 문제집</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <h1 className={style.title}>스터디 모임의 정보를 알려주세요!</h1>
          <div className={style.flex}>
            <div>
              <h4 className={style.text}>스터디 주제</h4>
              <input
                type="text"
                name="study_topic"
                className={style.inputBox__S}
              />
            </div>
            <div>
              <h4 className={style.text}>스터디 기간</h4>
              <select name="study_duration" className={style.inputBox__S}>
                <option value="미정">미정</option>
                <option value="1개월">1개월</option>
                <option value="2개월">2개월</option>
                <option value="3개월">3개월</option>
                <option value="6개월">6개월</option>
                <option value="장기">장기</option>
              </select>
            </div>
          </div>
          <div className={style.flex}>
            <div className={style.mt35}>
              <h4 className={style.text}>모집 인원</h4>
              <input
                type="number"
                name="study_capacity"
                className={style.inputBox__S}
              />
            </div>
            <div className={style.mt35}>
              <h4 className={style.text}>모집 마감일</h4>
              <DatePicker
                name="study_deadline"
                className={style.inputBox__S}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date as Date)}
              />
            </div>
          </div>
          <div className={style.mt35}>
            <h4 className={style.text}>스터디 모임 이름</h4>
            <input
              type="text"
              className={style.inputBox__L}
              name="study_name"
            />
            <div className={style.editor}></div>
          </div>
        </div>
        <div
          className={`${style.flex} ${style.btn_wrapper} ${style.mt35} ${style.black}`}
        >
          <button className={style.btn} type="submit">
            취소
          </button>
          <button
            className={`${style.btn} ${style.blue} ${style.color_white}`}
            type="submit"
          >
            업로드
          </button>
        </div>
      </form>
    </div>
  );
};
export default WriteForm;
