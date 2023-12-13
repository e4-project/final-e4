import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const deleteRecruitComment = async (pId: string, cId: string, ) => {
  try {
    const { data } = await axios.delete(
      getBaseUrl(`/api/recruit/${pId}/comment/${cId}`)
    );
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};
