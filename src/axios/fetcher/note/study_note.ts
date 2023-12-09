// import { api } from "@/axios/api";
import axios from "axios";

export const studyNoteApi = async () => {
  try {
    const { data } = await axios.get("/study/note");
    return data;
  } catch (err: any) {
    console.error(err);
  }
};