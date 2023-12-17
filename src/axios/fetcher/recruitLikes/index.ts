import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const loadRecruitLikeApi = async (recruitId: string) => {
  try {
    const { data } = await axios.get(getBaseUrl(`/api/recruit/${recruitId}/likes`));
    return data;
  } catch (err: any) {
    console.error(err);
  }
};

export const postRecruitLikes = async (recruitId: string, userId: string) => {
  try {
    //내가 만든 스터디 leader _id으로 찾기
    const { data } = await axios.post(getBaseUrl(`/api/recruit/${recruitId}/likes`), {
      userId,
    });
    return data;
  } catch (error: any) {
    console.error(error.response);
  }
};

export const deleteRecruitLike = async (recruitId: string) => {
  try {
    const { data } = await axios.delete(
      getBaseUrl(`/api/recruit/${recruitId}/likes`)
    );
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
