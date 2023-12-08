import { api } from "@/axios/api";

export const loadRecruitApi = async () => {
  const {data} = await api.get(
    "/api/recruits"
  );
  return data;
};
