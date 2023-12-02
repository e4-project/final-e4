import React from "react";
import { IRequestCommont } from "@/interfaces/commont";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import style from "@/components/Comment/comment.module.css";

interface IProps {
  comment: IRequestCommont;
  name?: string;
  createdAt?: string;
}

const ReadComment = ({ name, comment, createdAt }: IProps) => {
  return (
    <div className="comment_container">
      <Card
        name="이동현"
        actionEl={
          <div className={style.button_wrap}>
            <Button text="삭제" />
          </div>
        }
        contentEl={<div>{comment.contents}</div>}
      />
    </div>
  );
};

export default ReadComment;
