// import { api } from "@/axios/api";
import { baseUrl } from "@/constants/url";
import axios from "axios";

export const postBoardApi = async (content: string) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/study/board`, {content});
    return data;
  } catch (err: any) {
    console.error(err);
  }
};