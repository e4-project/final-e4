"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./study.module.css";
import Button from "@/components/common/Button";
import { useParams } from "next/navigation";

import { set } from "mongoose";

// import TextareaAutosize from 'react-textarea-autosize';
/**
 * @name note
 * @author 문태랑
 * @prop name
 * @desc 스터디 진도표 페이지 (홈)
 * @returns number
 */

interface WeekGoal {
  week: string;
  content: string;
}
const Page = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // 수정 상태
  const [inputs, setInputs] = useState([
    { week_input: "", study_content_input: "" },
  ]);

  const [noteData, setNoteData] = useState<WeekGoal[]>([]);
  // 노트 데이터 상태
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/studynote/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); // Add this line
        setNoteData(data.weekGoal);

        // noteData를 기반으로 inputs 상태를 업데이트합니다.
        const newInputs = data.weekGoal.map((weekGoal: any) => ({
          week_input: weekGoal.week,
          study_content_input: weekGoal.content,
        }));
        setInputs(newInputs);

      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchData();
  }, [isEdit]);
  const onEditClick = () => {
    setIsEdit(true);
  };
  // 수정 버튼 클릭시 수정 on
  const { id } = useParams<{ id: string }>() || {};
  const onSaveClick = async () => {
    setIsEdit(false);

    const weekGoal = inputs.map((input, index) => ({
      [`${index + 1}주차`]: input.study_content_input,
    }));

    // 학습노트 작성하는 데이터베이스에 저장하는 로직
    try {
      const response = await fetch("/api/studynote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weekGoal, id }), // id를 추가합니다.
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };
  const onInputChange = (
    index: number,
    type: "week_input" | "study_content_input",
    value: string
  ) => {
    const newInputs = [...inputs]; // 기존 입력값 배열에 복사
    newInputs[index][type] = value; // 새 배열에 변경 값 넣고
    setInputs(newInputs); // 상태 업데이트
  };
  const onAddClick = () => {
    setInputs([...inputs, { week_input: "", study_content_input: "" }]);
  };
  // 새로운 입력값 배열에 추가

  const onRemoveClick = (index: number) => {
    const newInputs = [...inputs];
    // 기존 입력값 배열 복사
    newInputs.splice(index, 1);
    // 삭제할 값을 배열에서 제거하고
    setInputs(newInputs);
    // 상태 업데이트
  };

  return (
    <div className={style.progress_container}>
      <div className={style.change_btn}>
        <Button
          text={isEdit ? "저장" : "수정"}
          className={style.edit_save_btn}
          onClick={isEdit ? onSaveClick : onEditClick}
        />
      </div>
      <div className={style.input_container}>
        {inputs.map((input, index) => {
          const note = noteData.find(
            (note) => note.week === `${index + 1}주차`
          );
          return (
            <div className={style.input_box} key={note ? note.week : index}>
              <input
                className={`${style.week_input} ${
                  isEdit ? style.edit_week_input : ""
                }`}
                type="text"
                placeholder={`${index + 1}주차`}
                value={`${index + 1}주차`}
                onChange={(e) =>
                  onInputChange(index, "week_input", e.target.value)
                }
                disabled={!isEdit}
              />

              {isEdit && (
                <input
                  type="text"
                  value={input.study_content_input}
                  onChange={(e) =>
                    onInputChange(index, "study_content_input", e.target.value)
                  }
                />
              )}
              {!isEdit && note && <p>{note.content}</p>}
              {isEdit && (
                <Button
                  text="삭제"
                  color="#748ffc"
                  onClick={() => onRemoveClick(index)}
                />
              )}
            </div>
          );
        })}
        {isEdit && (
          <Button
            text="추가"
            className={style.add_btn}
            color="#748ffc"
            onClick={onAddClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;