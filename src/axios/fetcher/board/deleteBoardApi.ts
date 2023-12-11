// import { api } from "@/axios/api";
import { baseUrl } from "@/constants/url";
import axios from "axios";

export const deleteBoardApi = async (id: string) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/api/study/board/${id}`);
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
