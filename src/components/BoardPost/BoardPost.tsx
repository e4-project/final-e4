import React from "react";
import { useSession } from "next-auth/react";
import Card from "@/components/common/Card";
import CommentForm from "@/components/Comment/CommentForm";
import SingleComment from "@/components/Comment/SingleComment";
import Button from "@/components/common/Button";
import { IResponseBoard } from "@/interfaces/study_board";
import style from "./boardPost.module.css";
import { loadStudyPostComment } from "@/axios/fetcher/studyPostComment/loadStudyPostComment";
import LikeButton from "./like_button/LikeButton";

interface Iprops {
  board: IResponseBoard;
  onDelPost: (id: string) => void;
}

const BoardPost = ({ board, onDelPost }: Iprops) => {
  const { _id, content, user, createdAt } = board;

  return (
    <div className={style.board_post_wrap}>
      <div className={style.board_post_container}>
        <div className="post_wrap">
          {
            <Card
              name={user?.name as string}
              imagePath={user?.image as string}
              createdAt={createdAt}
              actionEl={
                <div className={style.post_btn_wrap}>
                  <Button
                    text="삭제"
                    className={`${style.post_btn} ${style.btn_del}`}
                    onClick={() => onDelPost(_id)}
                  />
                  <Button text="수정" className={style.post_btn} />
                </div>
              }
              content={content}
            />
          }
        </div>
        <LikeButton _id = {_id}/>
      </div>
      <div className={style.comment_container}>
        <div>
          <CommentForm user={user} postId="" fetcher={async () => {}}/>
        </div>
        <div>
          <SingleComment isToggleCtrl postId={_id} loadFetcher={loadStudyPostComment} updateFetcher={async () => {}} delFetcher={async () => {}}/>
        </div>
      </div>
    </div>
  );
};

export default BoardPost;
