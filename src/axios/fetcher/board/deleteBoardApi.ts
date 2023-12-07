import { api } from "@/axios/api";

export const deleteBoardApi = async (id: string) => {
  try {
    const { data } = await api.delete(`/api/study/board/${id}`);
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
