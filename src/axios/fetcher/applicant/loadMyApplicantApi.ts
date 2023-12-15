// import { api } from "@/axios/api";
import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

//참여 신청한 스터디 모두 조회
export const loadMyApplicantApi = async (userId: string) => {
  try {
    const { data } = await axios.get(getBaseUrl(`/api/applicant/me/${userId}`));
    return data;
  } catch (err: any) {
    console.error(err);
  }
};

// 내 스터디에 참여한 신청자 내역 
export const loadApplicantOfMyStudyApi = async (userId: string, recruitid: string) => {
  try {
    const { data } = await axios.get(getBaseUrl(`/api/applicant/me/${userId}/studyname/${recruitid}`));
    return data;
  } catch (err: any) {
    console.error(err);
  }
};

