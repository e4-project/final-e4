import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const loadBoardApi = async (studyId: string) => {
  try {     //                                  
    const { data } = await axios.get(getBaseUrl(`/api/study/${studyId}/board`));
    return data;
  } catch (err: any) {
    console.error(err);
  }
};

export const postBoardApi = async (studyId: string, content: string) => {
  console.log({content})
  try {
    const { data } = await axios.post(getBaseUrl(`/api/study/${studyId}/board`), {content});
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const deleteBoardApi = async (studyId: string, postId: string) => {
  try {
    const { data } = await axios.delete(getBaseUrl(`/api/study/${studyId}/board/${postId}`));
    return data;
  } catch (err: any) {
    throw(err);
  }
};
