import React from "react";
import style from "../comment.module.css";
import { IRequestCommont } from "@/interfaces/commont";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

interface IProps {
  comment: IRequestCommont;
  name?: string;
  createdAt?: string;
}

const ReadComment = ({ name, comment, createdAt }: IProps) => {
  return (
    <div className={style.commentWrap}>
      <div className={style.card_wrap}>
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
    </div>
  );
};

export default ReadComment;
