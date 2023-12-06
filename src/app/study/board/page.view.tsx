"use client";
import { useState } from "react";
import Button from "@/components/common/Button";
import BoardPost from "@/components/BoardPost/BoardPost";
import PostForm from "@/components/BoardPost/PostForm";
import { IResponseBoard } from "@/interfaces/study_board";
import style from "./board.module.css";

interface IProps {
  data: IResponseBoard[];
}

const BoardView = ({ data }: IProps) => {
  const [isEdit, setEdit] = useState(false);
  const onEdit = () => {
    setEdit(!isEdit);
  };
  return (
    <div className={style.board_view_wrap}>
      <div className={style.top_button}>
        <Button
          text={isEdit ? "게시글 저장":"게시글 작성"}
          color="#748ffc"
          bgColor="#f5f7ff"
          onClick={onEdit}
        />
      </div>
      <div className={style.board_view_container}>
        {isEdit ? (
          <PostForm />
        ) : (
          <>
            {data?.map((item) => (
              <BoardPost key={item._id} {...item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BoardView;
