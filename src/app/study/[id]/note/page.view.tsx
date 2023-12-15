"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./note.module.css";
import MyEditorComponent from "./page.write";
import Button from "@/components/common/Button";
import { useParams } from 'next/navigation';

/**
 * @name note
 * @author 문태랑
 * @prop name
 * @desc 공부 노트 페이지
 * @returns number
 */

const Page = () => {
  const [selectWeek, setSelectWeek] = useState<string>("1"); // 현재 선택된 주차 상태
  const [onEditor, setOnEditor] = useState(false);
  const [weekCount, setWeekCount] = useState(5); // 주차의 수를 상태로 관리
  const [studyMembers, setStudyMembers] = useState<string[]>([]);
  const {id} = useParams<{id: string}>()||{};
  const [editorContent, setEditorContent] = useState("");

  const onWeekChange = (event: any) => {
    setSelectWeek(event.target.value);
  };

  const onWriteButtonClick = () => {
    setOnEditor(true);
  };

  const onSaveButtonClick = () => {
    setOnEditor(false);
  };

  const onSaveEditorContent = async (content : any) => {
    setEditorContent(content);
    setOnEditor(false);
  };

  useEffect(() => {
    const fetchStudyMembers = async () => {
      try {
        const result = await fetch(`/api/study/studyinfo/${id}`);
        const data = await result.json();
        console.log(data);

        if (data && data.weekCount) {
          setWeekCount(data.weekCount);
        }

        if (data && data.applicants) {
          setStudyMembers(data.applicants.map((applicants: any) => applicants.name));
        }

        if (data && data.weekGoal) {
          setWeekCount(data.weekGoal.length);
          setSelectWeek(`${data.weekGoal.length}주차`);
        }
      } catch (error) {
        console.error('스터디 멤버 정보를 가져오는 중 에러 발생', error);
      }
    };

    fetchStudyMembers();
  }, [id]);

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
          <MyEditorComponent onSave={onSaveEditorContent}/>
        ) : (
          <div className={style.member_note}>
            {studyMembers.map((member, index) => (
              <div key={index}>
                <p className={style.member_list}>
                  <span style={{ color: "#748ffc" }}>
                    {member}
                  </span>
                  의 공부 노트
                </p>
                <p>{editorContent}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
