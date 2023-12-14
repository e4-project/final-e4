// import { api } from "@/axios/api";
import { baseUrl } from "@/constants/url";
import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const loadMyApplicantApi = async (userId: string) => {
  try {
    //참여 신청한 스터디 모두 조회
    const { data } = await axios.get(getBaseUrl(`/api/applicant/me/${userId}`));
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
