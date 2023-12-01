"use client";
import { FormEvent, useState, useEffect } from "react";
import style from "./EditForm.module.css";
import DatePicker from "react-datepicker";

interface MyFormProps {
  result: any;
}

export default function MyForm({ result }: MyFormProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // result.study_deadline 값을 Date 객체로 변환하여 selectedDate 상태에 저장
  useEffect(() => {
    if (result?.study_deadline) {
      setSelectedDate(new Date(result.study_deadline));
    }
  }, [result]);
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // 이벤트의 현재 대상 폼에서 FormData를 생성
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    // FormData를 JavaScript 객체로 변환
    const data = Object.fromEntries(formData);
    // 서버로 데이터를 전송하고 응답을 받기
    const response = await fetch("/api/post/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // 서버 응답을 JSON 형식으로 파싱
    const result = await response.json();
    console.log(result);

    // 서버 응답에 리디렉션 정보가 있으면 해당 주소로 이동
    if (result.redirect) {
      window.location.href = result.redirect;
    }
  };
  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit} action="/api/post/edit" method="POST">
        <h1> 수정 페이지 </h1>
        <h1 className={style.title}>스터디에 사용될 교재 정보를 알려주세요!</h1>

        <div className={style.mb120}>
          <h4 className={style.text}>
            함께 공부할 강의/수업/책 등 교재의 이름
          </h4>
          <input
            type="text"
            name="item_name"
            defaultValue={result?.item_name || ""}
            className={style.inputBox__L}
          />
          <div className={style.flex}>
            <div className={style.mt35}>
              <h4 className={style.text}>교재 정보를 알 수 있는 페이지 링크</h4>
              <input
                type="text"
                defaultValue={result?.page_link || ""}
                name="page_link"
                className={style.inputBox__S}
              />
            </div>
            <div className={style.mt35}>
              <h4 className={style.text}>교재 유형</h4>
              <select
                name="item_type"
                defaultValue={result?.item_type || ""}
                className={style.inputBox__S}
              >
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
                defaultValue={result?.study_topic || ""}
                className={style.inputBox__S}
              />
            </div>
            <div>
              <h4 className={style.text}>스터디 기간</h4>
              <select
                name="study_duration"
                defaultValue={result?.study_duration || ""}
                className={style.inputBox__S}
              >
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
                defaultValue={result?.study_capacity || ""}
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
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className={style.mt35}>
            <h4 className={style.text}>스터디 모임 이름</h4>
            <input
              type="text"
              defaultValue={result?.study_name || ""}
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
            수정
          </button>
        </div>
        <input
          style={{ display: "none" }}
          name="_id"
          defaultValue={result && result._id ? result._id.toString() : ""}
        />
      </form>
    </div>
  );
}
