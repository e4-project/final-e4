"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReadComment from "./ReadComment";
import style from "./comment.module.css";

interface IProps {
  postId: string;
  fetcher: (prop: string) => Promise<any>;
}

const SingleComment = ({ postId, fetcher }: IProps) => {
  const [commentToggle, setCommentToggle] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchComment = useCallback(async () => {
    await fetcher(postId).then((comments) => {
      setComments(comments)});
  }, [fetcher, postId]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  const onShowComment = useCallback(() => {
    setCommentToggle((prev) => !prev);
  }, []);

  return (
    <div className={style.commentWrap}>
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
        <div>댓글 {comments?.length || 0}</div>
      </div>
      {commentToggle &&
        (comments?.length ? (
          comments?.map((comment, idx) => (
            <ReadComment key={idx} comment={comment} />
          ))
        ) : (
          <div></div>
        ))}
    </div>
  );
};

export default SingleComment;
