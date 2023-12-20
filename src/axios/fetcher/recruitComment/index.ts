import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const loadRecruitComment = async (postId: string) => {
  console.log({postId})
  try {
    const { data } = await axios.get(getBaseUrl(`/api/recruit/${postId}/comment`));
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};

export const postRecruitComment = async (insertData: any) => {
  console.log({postRComment: insertData})
  const { postId } = insertData;
  try {
    const { data } = await axios.post(
      getBaseUrl(`/api/recruit/${postId}/comment`),
      insertData
    );
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};

export const deleteRecruitComment = async (postId: string, boadId: string, commentId: string ) => {
  try {
    const { data } = await axios.delete(
      getBaseUrl(`/api/recruit/${postId}/comment/${commentId}`)
    );
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};


