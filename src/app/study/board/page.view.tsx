"use client";
import Button from "@/components/common/Button";
import BoardPost from "@/components/BoardPost/BoardPost";
import { IResponseBoard } from "@/interfaces/study_board";
import style from "./board.module.css";

interface IProps {
  data: IResponseBoard[];
}

const BoardView = ({ data }: IProps) => {
  return (
    <div className={style.board_view_wrap}>
      <div className={style.top_button}>
        <Button
          text="글 작성"
          color="#748ffc"
          bgColor="#f5f7ff"
        />
      </div>
      <div className={style.board_post_wrap}>
        {data?.map((item) => (
          <BoardPost key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default BoardView;
