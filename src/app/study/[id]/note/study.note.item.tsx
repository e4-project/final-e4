import React, { useState, useEffect } from "react";
import style from "./note.module.css";

const StudyNoteItem = (props: any) => {
  const {
    studyMember,
    selectWeek,
    onSelectMemberNote,
    selectedMemberNote,
    memberNoteContents,
    setMemberNoteContents,
  } = props;

  const handleClick = () => {
    onSelectMemberNote(studyMember?.member?._id);
  };

  useEffect(() => {
    const fetchMemberNoteContents = async () => {
      try {
        // 멤버의 공부노트 데이터를 받아옴
        const response = await fetch(
          `/api/study/note/${studyMember?.member?._id}?week=${selectWeek}`
        );
        const data = await response.json();

        // 받아온 내용을 상태로 업데이트
        setMemberNoteContents(data.contents);
      } catch (error) {
        console.error("에러", error);
      }
    };

    if (studyMember?.member?._id === selectedMemberNote) {
      fetchMemberNoteContents();
    }
  }, [
    studyMember?.member?._id,
    selectWeek,
    setMemberNoteContents,
    selectedMemberNote,
  ]);

  return (
    <div onClick={handleClick}>
      <p className={style.member_list}>
        <span style={{ color: "#748ffc" }}>{studyMember?.member?.name}</span>의
        공부 노트
      </p>
      {studyMember?.member?._id === selectedMemberNote && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: memberNoteContents }} />
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: memberNoteContents }}></div>
    </div>
  );
};

export default StudyNoteItem;
