import { api } from "@/axios/api";

export const loadComment = async (id: string) => {
  try {
    const { data } = await api.get(`/api/study/board/${id}/comment`);
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};

