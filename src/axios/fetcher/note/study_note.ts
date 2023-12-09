// import { api } from "@/axios/api";
import { baseUrl } from "@/constants/url";
import axios from "axios";

export const studyNoteApi = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/study/note`);
    return data;
  } catch (err: any) {
    console.error(err);
  }
};