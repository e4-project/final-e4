import { api } from "@/axios/api";

export const loadRecruitOneByIdApi = async (studyName: string) => {
  const {data} = await api.get(
    `/api/recruits/${studyName}`
  );
  return data;
};
