// import { api } from "@/axios/api";
import axios from "axios";

export const loadBoardApi = async () => {
  try {
    const { data } = await axios.get("/api/study/board");
    return data;
  } catch (err: any) {
    console.error(err.response);
  }
};
