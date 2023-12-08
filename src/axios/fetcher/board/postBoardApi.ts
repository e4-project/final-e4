import { api } from "@/axios/api";

export const postBoardApi = async (content: string) => {
  try {
    const { data } = await api.post("/api/study/board", {content});
    return data;
  } catch (err: any) {
    console.error(err);
  }
};