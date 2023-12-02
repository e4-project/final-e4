"use client";
import React, { useCallback, useEffect, useState } from "react";
import { loadComment } from "@/axios/fetcher/comment/loadComment";
import ReadComment from "./ReadComment";

const SingleComment = ({ boardPostId }: { boardPostId: string }) => {
  const [comments, setComments] = useState([]);
  const fetchComment = useCallback(() => {
    loadComment(boardPostId).then((comments) => setComments(comments));
  }, [boardPostId]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  return (
    <div>
      {comments.length ?
        comments.map((comment, idx) => (
          <ReadComment key={idx} comment={comment} />
        )) : <div></div>}
    </div>
  );
};

export default SingleComment;
