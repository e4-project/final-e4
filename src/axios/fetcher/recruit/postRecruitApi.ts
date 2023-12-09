import { api } from "@/axios/api";
import { IRecruitPost } from "@/interfaces/recruit";

export type TRecruitOmitApplicants = Omit<IRecruitPost, "applicants" | "leader">;

export const postRecruitApi = async (insertData: TRecruitOmitApplicants) => {
  const {data} = await api.post(
    "/api/recruits",
    insertData
  );
  return data;
};
