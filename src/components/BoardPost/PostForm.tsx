import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import PostFormEditor from "../common/Editor";
import style from "./boardPost.module.css";

interface IProp {
  content: string
  setContent: Dispatch<SetStateAction<string>>
}

const PostForm = ({content, setContent}: IProp) => {
  return (
    <div className={style.boardPostForm}>
      <PostFormEditor
        content={content}
        setContent={setContent}
        placeholder=""
      />
    </div>
  );
};

export default PostForm;
