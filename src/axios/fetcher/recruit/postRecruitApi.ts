// import { api } from "@/axios/api";
import { IRecruitPost } from "@/interfaces/recruit";
import axios from "axios";

export type TRecruitOmitApplicants = Omit<IRecruitPost, "applicants" | "leader">;

export const postRecruitApi = async (insertData: TRecruitOmitApplicants) => {
  const {data} = await axios.post(
    "/api/recruits",
    insertData
  );
  return data;
};
