// import { api } from "@/axios/api";

import { baseUrl } from "@/constants/url";
import axios from "axios";

export const loadRecruitApi = async () => {
  try {
    const {data} = await axios.get(
      `${baseUrl}/api/recruits`
    );
    return data;
  } catch (err: any) {
    console.error(err)
  } 
};
