import { api } from "@/axios/api";

export const loadBoardApi = async () => {
  try {
    const { data } = await api.get("/study/board");
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
