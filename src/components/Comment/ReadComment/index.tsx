import React from "react";
import { IRequestCommont } from "@/interfaces/commont";
// import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import style from "@/components/Comment/comment.module.css";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

interface IProps {
  comment: IRequestCommont;
  name?: string;
  createdAt?: string;
}

const Card = dynamic(async () => await import('@/components/common/Card'))
const ReadComment = ({ name, comment, createdAt }: IProps) => {
  const { data } = useSession();
  const user = data?.user;
  return (
    <div className="comment_container">
      <Card
        name={user?.name as string}
        imagePath={user?.image as string}
        actionEl={
          <div className={style.button_wrap}>
            <Button text="삭제" />
          </div>
        }
        content={`<div>${comment.content}</div>`}
      />
    </div>
  );
};

export default ReadComment;
