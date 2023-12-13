import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const loadRecruitComment = async (postId: string) => {
  try {
    const { data } = await axios.get(getBaseUrl(`/api/recruit/${postId}/comment`));
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};

