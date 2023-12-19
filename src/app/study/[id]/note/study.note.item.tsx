import React from 'react';
import style from "./note.module.css";

const StudyNoteItem = (props :any) => {
    const {studyMember, memberNotes, memberNoteContents} = props;
    

    return (
    <div
        onClick={() => memberNotes(studyMember?.member?._id)}              >
        <p className={style.member_list}>
        <span style={{ color: "#748ffc" }}>
            {studyMember?.member?.name}
        </span>
        의 공부 노트
        </p>
        <div dangerouslySetInnerHTML={{ __html: memberNoteContents }} />
    </div>
    )
}

export default StudyNoteItem