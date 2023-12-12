// import { api } from "@/axios/api";
import { baseUrl } from "@/constants/url";
import { IRecruitPost } from "@/interfaces/recruit";
import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export type TRecruitOmitApplicants = Omit<
  IRecruitPost,
  "applicants" | "leader"
>;

export const postRecruitApi = async (insertData: TRecruitOmitApplicants) => {
  const { data } = await axios.post(getBaseUrl("/api/recruits"), insertData);
  return data;
};
