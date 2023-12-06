import { api } from "@/axios/api";

export const loadRecruitApi = async () => {
  const {data} = await api.get(
    "http://localhost:3000/api/recruits"
  );
  return data;
};
