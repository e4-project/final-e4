"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import style from "./comment.module.css";

interface IPrpps {
  postId: string;
  user: { name: string; image: string };
  fetcher: (data: any) => Promise<any>;
}

const CommentForm = ({ user, postId, fetcher }: IPrpps) => {
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
    async (event: FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (content) {
        content.replaceAll("\n", "&#10;");
        const insertData = {
          postId,
          user,
          content,
        };
        const data = await fetcher(insertData);
        data && location.reload();
        if (textAreaRef.current) {
          textAreaRef.current.value = "";
          setContent("");
        }
      }
    },
    [content, fetcher, postId, user]
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
        {content !== "" && (
          <Button onClick={onReset} text="초기화" type="button" />
        )}

        <Button
          text="등록"
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
