"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReadComment from "./ReadComment";
import style from "./comment.module.css";

interface IProps {
  postId: string;
  isToggleCtrl: boolean;
  loadFetcher: (prop: string) => Promise<any>;
  delFetcher: (pId: string, cID: string) => Promise<any>;
  updateFetcher: (prop: any) => Promise<any>;
}

const SingleComment = ({
  postId,
  isToggleCtrl,
  loadFetcher,
  delFetcher,
  updateFetcher,
}: IProps) => {
  const [commentToggle, setCommentToggle] = useState(true); //토글은 밖에서 하도록 처리
  const [comments, setComments] = useState([]);
  const fetchComment = useCallback(async () => {
    await loadFetcher(postId).then((comments) => {
      setComments(comments);
    });
  }, [loadFetcher, postId]);

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
          comments?.map((comment, idx) => (
            <ReadComment
              postId={postId}
              key={idx}
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
