import { api } from "@/axios/api";

export const loadRecruitOneByIdApi = async (studyName: string) => {
  const {data} = await api.get(
    `http://localhost:3000/api/recruits/${studyName}`
  );
  return data;
};
