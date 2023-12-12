import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

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
