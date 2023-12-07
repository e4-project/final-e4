import React, { useState } from "react";
import PostFormEditor from "../common/Editor";

const PostForm = () => {
  const [content, setContent] = useState("");

  return (
    <div style={{ background: "#fff" }}>
      <PostFormEditor
        content={content}
        setContent={setContent}
        placeholder=""
      />
    </div>
  );
};

export default PostForm;
