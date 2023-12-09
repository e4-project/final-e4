// import { api } from "@/axios/api";
import { baseUrl } from "@/constants/url";
import axios from "axios";

export const loadBoardApi = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/study/board`);
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
