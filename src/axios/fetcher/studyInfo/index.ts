import { api } from "@/axios/api";

export const studyInfoApi = async () => {
  try {
    const { data } = await api.get("/api/recruits/:sutdyname"); // 스터디 등록한 leader의 스터디 모집글 가져오기
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
