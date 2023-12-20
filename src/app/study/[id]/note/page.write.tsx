import Editor from "@/components/common/Editor";
import React, { useState, useEffect } from "react";
import style from "./note.module.css";
import Button from "@/components/common/Button";

const MyEditorComponent = ({ onSave }: { onSave: (content: string) => void }) => {
  const [editorData, setEditorData] = useState("");

  useEffect(() => {
    onSave(editorData);
  }, [editorData, onSave]);

  return (
    <div className={style.note_write_wrap}>
      <Editor content={editorData} placeholder="" setContent={setEditorData} />
    </div>
  );
};

export default MyEditorComponent;
