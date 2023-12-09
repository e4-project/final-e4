// import { api } from "@/axios/api";

import axios from "axios";

export const loadRecruitOneByIdApi = async (studyName: string) => {
  const {data} = await axios.get(
    `/api/recruits/${studyName}`
  );
  return data;
};
