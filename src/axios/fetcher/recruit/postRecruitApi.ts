// import { api } from "@/axios/api";
import { baseUrl } from "@/constants/url";
import { IRecruitPost } from "@/interfaces/recruit";
import axios from "axios";

export type TRecruitOmitApplicants = Omit<
  IRecruitPost,
  "applicants" | "leader" | "weekGoal"
>;

export const postRecruitApi = async (insertData: TRecruitOmitApplicants) => {
  const { data } = await axios.post(`${baseUrl}/api/recruits`, insertData);
  return data;
};
