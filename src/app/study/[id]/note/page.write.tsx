import Editor from "@/components/common/Editor";
import React, { useState } from "react";
import style from "./note.module.css";
import Button from "@/components/common/Button";

const MyEditorComponent = ({onSave}: any) => {
  const [editorData, setEditorData] = useState("");

  const handleSave = () => {
    onSave(editorData); // 에디터 내용을 부모 컴포넌트에 전달
  };
  return (
    <div>
      <Editor content={editorData} placeholder="" setContent={setEditorData} />
      <Button onClick={handleSave} text="학습노트 저장하기" className={style.write_btn}/>
    </div>
  );
};

export default MyEditorComponent;
