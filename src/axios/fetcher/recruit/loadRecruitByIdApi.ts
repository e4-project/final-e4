// import { api } from "@/axios/api";

import { baseUrl } from "@/constants/url";
import axios from "axios";

export const loadRecruitOneByIdApi = async (studyName: string) => {
  try {
    const {data} = await axios.get(
      `${baseUrl}/api/recruits/${studyName}`
    );
    console.log({loadRecruitOneByIdApi: data})
    return data;
  } catch(error: any) {
    console.error(error.response)
  }
};
