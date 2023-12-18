import React, { useEffect, useState } from "react";
import { IRequestCommont } from "@/interfaces/commont";
import Button from "@/components/common/Button";
import style from "@/components/Comment/comment.module.css";
import dynamic from "next/dynamic";
import { loadUserApi } from "@/axios/fetcher/user/loadUserApi";
interface IProps {
  comment: IRequestCommont;
  postId: string;
  user?: any;
  onUpdate: (pro: any) => Promise<any>;
  onDelFetch: (pId: string, comment: any) => Promise<any>;
}

const getNewLine = (str: string) => {
  return str.replaceAll("\n", "<br />");
};

const Card = dynamic(async () => await import("@/components/common/Card"));
const ReadComment = ({ comment, postId, onUpdate, onDelFetch }: IProps) => {
  const [currentUserId, setCurrentUserId] = useState("");
  useEffect(() => {
    (async () => {
      const data = await loadUserApi();
      setCurrentUserId(data._id);
    })();
  }, []);

  return (
    <div className="comment_container">
      <Card
        createdAt={comment.createdAt}
        name={comment?.user?.name}
        imagePath={comment?.user?.image as string}
        actionEl={
          <div className={style.button_wrap}>
            {currentUserId === comment?.user?._id && (
              <>
                <input className={style.check} type="checkbox" name={comment._id} id={comment._id} />
                <label className={style.check_label} htmlFor={comment._id}>
                  <img src="/icons/icon_dot3.svg" alt="" />
                  <div className={style.expansion_box}>
                    <Button
                    text="수정"
                    onClick={async () => {
                      console.log("수정 기능");
                    }}
                    />
                    <Button
                      text="삭제"
                      style={{
                        background: "#fd9494",
                        color: "#fdfdfd",
                        border: "none",
                      }}
                      onClick={async () => {
                        const con = confirm("정말로 삭제하시겠습니까?");
                        if (con) {
                          const data = await onDelFetch(postId, comment._id);
                          data && location.reload();
                        }
                      }}
                    />
                  </div>
                </label>
              </>
            )}
          </div>
        }
        content={getNewLine(comment.content)}
      />
    </div>
  );
};

export default ReadComment;
