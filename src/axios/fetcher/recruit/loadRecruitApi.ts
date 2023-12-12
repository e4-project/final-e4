// import { api } from "@/axios/api";
import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const loadRecruitApi = async () => {
  try {
    const { data } = await axios.get(getBaseUrl("/api/recruits"));
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
