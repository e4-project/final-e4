"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import BoardPost from "@/components/BoardPost/BoardPost";
import PostForm from "@/components/BoardPost/PostForm";
import { IResponseBoard } from "@/interfaces/study_board";
import { deleteBoardApi, postBoardApi } from "@/axios/fetcher/board";
import style from "./board.module.css";

interface IProps {
  data: IResponseBoard[];
  studyId: string;
}

const BoardView = ({ data, studyId }: IProps) => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isEdit, setEdit] = useState(false);

  const onAddNewPost = useCallback(async () => {
    if (content) {
      try {
        const data = await postBoardApi(studyId, content);
        data && router.refresh();
      } catch (error: any) {
        if (error?.response?.status === 403) {
          alert("스터디원이 아닙니다");
        }
      }
      setContent("");
    }
  }, [content, router, studyId]);

  const onDelPost = useCallback(
    async (id: string) => {
      const con = confirm("정말로 삭제하시겠습니까?");
      if (con) {
        try {
          const data = await deleteBoardApi(studyId, id);
          data && router.refresh();
        } catch (error: any) {
          if (error?.response?.status === 403) {
            const errorMsg = error?.response?.data?.msg;
            alert(errorMsg);
            return;
          }
        }
      }
    },
    [router, studyId]
  );

  const onEditPost = useCallback(() => {
    setEdit(!isEdit);
    isEdit && onAddNewPost();
  }, [isEdit, onAddNewPost]);

  const onClose = () => {
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
              <BoardPost key={item._id} onDelPost={onDelPost} studyId={studyId} board={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BoardView;
