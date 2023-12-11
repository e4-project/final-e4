// import { api } from "@/axios/api";

import { baseUrl } from "@/constants/url";
import axios from "axios";

export const studyInfoApi = async ({studyName}: {studyName: string}) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/recruits/${studyName}`); // 스터디 등록한 leader의 스터디 모집글 가져오기
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
