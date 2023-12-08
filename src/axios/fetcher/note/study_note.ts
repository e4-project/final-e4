import { api } from "@/axios/api";

export const studyNoteApi = async () => {
  try {
    const { data } = await api.get("/study/note");
    return data;
  } catch (err: any) {
    console.error(err);
  }
};