import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import style from "./comment.module.css";
import Textarea from "../common/Textarea";
import Button from "../common/Button";

interface IPrpps {
  postId: string;
  commentId?: string;
  editMode?: boolean;
  onClose?: () => void;
}

const CommentForm = ({ editMode, onClose }: IPrpps) => {
  const [content, setContent] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const onReset = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
      setContent("");
    }
  }, []);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const insert = content
        .replaceAll("<br>", "\r\n");
      console.log(insert);
    },
    [content]
  );

  return (
    <div className={style.comment_form}>
      <Textarea
        rows={3}
        ref={textAreaRef}
        value={content}
        onChange={onChange}
        placeholder="댓글을 입력해주세요."
      />
      <div className={style.button_wrap}>
        {editMode ? (
          <Button onClick={onClose} text="수정 취소" type="button" />
        ) : (
          content !== "" && (
            <Button onClick={onReset} text="초기화" type="button" />
          )
        )}
        <Button
          text={editMode ? "수정" : "등록"}
          color="#748ffc"
          bgColor="#f5f7ff"
          type="submit"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default CommentForm;
