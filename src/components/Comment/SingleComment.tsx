"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReadComment from "./ReadComment";
import style from "./comment.module.css";
import { IResponseUser } from "@/interfaces/user";

// export interface IResponseComment {
//   _id: string;
//   studyId: string;
//   content: string;
//   user: IResponseUser;
//   createdAt: string;
// }

interface IProps {
  postId: string;
  boardId: string;
  isToggleCtrl: boolean;
  loadFetcher:
    | ((postId: string) => Promise<any>)
    | ((postId: string, boardId: string) => Promise<any>);
  delFetcher:
    | ((postId: string, commentId: string) => Promise<any>)
    | ((postId: string, boardId: string, commentId: string) => Promise<any>);
  updateFetcher:     | ((postId: string, commentId: string) => Promise<any>)
  | ((postId: string, boardId: string, commentId: string) => Promise<any>);
}

const SingleComment = ({
  postId,
  boardId,
  isToggleCtrl,
  loadFetcher,
  delFetcher,
  updateFetcher,
}: IProps) => {
  const [commentToggle, setCommentToggle] = useState(true); //토글은 밖에서 하도록 처리
  const [comments, setComments] = useState([]);
  const fetchComment = useCallback(async () => {
    await loadFetcher(postId, boardId).then((comments) => {
      setComments(comments);
    });
  }, [boardId, loadFetcher, postId]);
  console.log(comments)
  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  const onShowComment = useCallback(() => {
    setCommentToggle((prev) => !prev);
  }, []);
  
  return (
    <div className={style.comment_wrap}>
      <div className={style.comment_display}>
        {isToggleCtrl && (
          <div className={style.comment_ctrl}>
            {commentToggle ? (
              <div className={style.show_ctrl} onClick={onShowComment}>
                ▲
              </div>
            ) : (
              <div className={style.show_ctrl} onClick={onShowComment}>
                ▼
              </div>
            )}
          </div>
        )}
        <div>{comments?.length || 0}개의 댓글</div>
      </div>
      {commentToggle &&
        (comments?.length ? (
          comments?.map((comment: any) => (
            <ReadComment
              postId={postId}
              boardId={boardId}
              key={comment?._id}
              comment={comment}
              onUpdate={updateFetcher}
              onDelFetch={delFetcher}
            />
          ))
        ) : (
          <div className={style.comment_container}>
            <p className={style.no_comment}>아직 작성된 댓글이 없습니다.</p>
          </div>
        ))}
    </div>
  );
};

export default SingleComment;
