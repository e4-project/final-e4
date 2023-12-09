import Editor from "@/components/common/Editor";
import React, { useState } from "react";

const MyEditorComponent = () => {
  const [editorData, setEditorData] = useState("");

  return (
    <div>
      <Editor content={editorData} placeholder="" setContent={setEditorData} />
    </div>
  );
};

export default MyEditorComponent;
