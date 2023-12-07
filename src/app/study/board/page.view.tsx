"use client";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/common/Button";
import BoardPost from "@/components/BoardPost/BoardPost";
import PostForm from "@/components/BoardPost/PostForm";
import { postBoardApi } from "@/axios/fetcher/board/postBoardApi";
import { IResponseBoard } from "@/interfaces/study_board";
import style from "./board.module.css";
import { deleteBoardApi } from "@/axios/fetcher/board/deleteBoardApi";
import { useRouter } from "next/navigation";

interface IProps {
  data: IResponseBoard[];
}

const BoardView = ({ data }: IProps) => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isEdit, setEdit] = useState(false);

  const onAddNewPost = useCallback(async () => {
    if (content) {
      const data = await postBoardApi(content);
      data && router.refresh();
      setContent("");
    }
  }, [content, router]);

  const onDelPost = useCallback(
    async (id: string) => {
      const con = confirm('정말로 삭제하시겠습니까?')
      if(con) {
        const data = await deleteBoardApi(id);
        data && router.refresh();
      }
    },
    [router]
  );

  const onEditPost = useCallback(() => {
    setEdit(!isEdit);
    isEdit && onAddNewPost();
  }, [isEdit, onAddNewPost]);

  const onClose = () => {
    // 그냥 닫지 말고 경고 메시지
    const con = window.confirm(
      "취소하면 작성한 내용이 사라집니다. 그래도 취소하실건가요?"
    );
    con && setEdit(false);
  };
  return (
    <div className={style.board_view_wrap}>
      <div className={style.top_button}>
        {isEdit && (
          <Button
            text="취소"
            style={{ width: 80 }}
            bgColor="#f5f7ff"
            onClick={onClose}
          />
        )}
        <Button
          text={isEdit ? "게시글 저장" : "게시글 작성"}
          color="#748ffc"
          bgColor="#f5f7ff"
          onClick={onEditPost}
        />
      </div>
      <div className={style.board_view_container}>
        {isEdit ? (
          <form>
            <PostForm content={content} setContent={setContent} />
          </form>
        ) : (
          <>
            {data?.map((item) => (
              <BoardPost key={item._id} onDelPost={onDelPost} board={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BoardView;
