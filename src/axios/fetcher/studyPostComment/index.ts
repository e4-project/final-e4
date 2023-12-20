import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

// /api/study/:studyid/board/:postid/comment
export const loadStudyPostComment = async (postId: string, boardId: string) => {
  console.log({ postId, boardId });
  try {
    const { data } = await axios.get(
      getBaseUrl(`/api/study/${postId}/board/${boardId}/comment`)
    );
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};

export const postStudyPostComment = async (insertData: any) => {
  console.log({ postRComment: insertData });
  console.log({ insertData });
  const { studyId, postId } = insertData;
  try {
    const { data } = await axios.post(
      getBaseUrl(`/api/study/${studyId}/board/${postId}/comment`),
      insertData
    );
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};

export const deleteStudyPostComment = async (
  postId: string,
  boardId: string,
  commentId: string
) => {
  try {
    console.log({postId, boardId, commentId});
    const { data } = await axios.delete(
      getBaseUrl(`/api/study/${postId}/board/${boardId}/comment/${commentId}`)
    );
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};
