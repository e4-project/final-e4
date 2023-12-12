"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./note.module.css";
import MyEditorComponent from "./page.write";
import Button from "@/components/common/Button";
import { studyNoteApi } from "@/axios/fetcher/note/study_note";

/**
 * @name note
 * @author 문태랑
 * @prop name
 * @desc 공부 노트 페이지
 * @returns number
 */

interface StudyNote {
  _id: string;
  author: {
    _id: string;
    name: string;
    image: string;
  };
  studyId: {
    _id: string;
    leader: string;
    studyKeyword: string;
  };
  week: string;
  contents: string;
}

const Page = () => {
  const [selectWeek, setSelectWeek] = useState<string>("1"); // 현재 선택된 주차 상태
  const [onEditor, setOnEditor] = useState(false);
  const [studyNote, setStudyNote] = useState<StudyNote | null>(null);
  const [weekCount, setWeekCount] = useState(5); // 주차의 수를 상태로 관리
  const onWeekChange = (event: any) => {
    setSelectWeek(event.target.value);
  };

  const onWriteButtonClick = () => {
    setOnEditor(true);
  };

  const onSaveButtonClick = () => {
    setOnEditor(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await studyNoteApi();

        if (data && data.author) {
          const authorName = data.author.name || "";
          setStudyNote({
            ...data,
            author: { ...data.author, name: authorName },
          });
        } else {
          setStudyNote(null);
        }
      } catch (error) {
        console.error("스터디 노트를 불러올 수 없습니다.", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.note_container}>
      <div className={style.note_header}>
        <div className={style.week_write_container}>
          <label>
            <select
              className={style.week_menu}
              value={selectWeek}
              onChange={onWeekChange}
            >
              {Array.from({ length: weekCount }, (_, i) => i + 1).map(
                (week) => (
                  <option key={week} value={week}>
                    {week}주차
                  </option>
                )
              )}
            </select>
          </label>
        </div>
        <div>
          {onEditor ? (
            <Button
              text="학습노트 저장하기"
              className={style.write_btn}
              onClick={onSaveButtonClick}
            />
          ) : (
            <Button
              text="학습노트 작성하기"
              className={style.write_btn}
              onClick={onWriteButtonClick}
            />
          )}
        </div>
      </div>
      <div className={style.view_note}>
        {onEditor ? (
          <MyEditorComponent />
        ) : (
          <div className={style.member_note}>
            <p className={style.member_list}>
              <span style={{ color: "#748ffc" }}>
                {studyNote?.author?.name}
              </span>
              의 공부 노트
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
