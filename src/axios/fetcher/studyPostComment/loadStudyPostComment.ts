// import { api } from "@/axios/api";

import { baseUrl } from "@/constants/url";
import axios from "axios";

export const loadStudyPostComment = async (id: string) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/study/board/${id}/comment`);
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};

