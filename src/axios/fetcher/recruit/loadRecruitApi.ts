// import { api } from "@/axios/api";

import axios from "axios";

export const loadRecruitApi = async () => {
  try {
    const {data} = await axios.get(
      "/api/recruits"
    );
    return data;
  } catch (err: any) {
    console.error(err.response)
  } 
};
