// import { api } from "@/axios/api";
import axios from "axios";

export const postBoardApi = async (content: string) => {
  try {
    const { data } = await axios.post("/api/study/board", {content});
    return data;
  } catch (err: any) {
    console.error(err);
  }
};