"use client";
import React, { useCallback, useEffect, useState } from "react";
import { loadComment } from "@/axios/fetcher/comment/loadComment";
import ReadComment from "./ReadComment";
import style from "./comment.module.css";

const SingleComment = ({ boardPostId }: { boardPostId: string }) => {
  const [commentToggle, setCommentToggle] = useState(false);
  const [comments, setComments] = useState([]);
  const fetchComment = useCallback(() => {
    loadComment(boardPostId).then((comments) => setComments(comments));
  }, [boardPostId]);

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
        <div>댓글 {comments.length}</div>
      </div>
      {commentToggle &&
        (comments.length ? (
          comments.map((comment, idx) => (
            <ReadComment key={idx} comment={comment} />
          ))
        ) : (
          <div></div>
        ))}
    </div>
  );
};

export default SingleComment;
