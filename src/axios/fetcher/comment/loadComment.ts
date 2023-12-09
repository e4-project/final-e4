// import { api } from "@/axios/api";

import axios from "axios";

export const loadComment = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/study/board/${id}/comment`);
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};

