import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

interface IApplicantRequest {
  userId: string;
  message: string;
  studyId: string;
}


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
export const loadApplicantOfMyStudyApi = async (
  userId: string,
  recruitid: string
) => {
  try {
    const { data } = await axios.get(
      getBaseUrl(`/api/applicant/me/${userId}/studyname/${recruitid}`)
    );
    return data;
  } catch (err: any) {
    console.error(err);
  }
};

// 스터디 신청
export const postApplicantApi = async (reqData: IApplicantRequest) => {
  console.log({ reqData });
  const { userId, ...insertData } = reqData;
  try {
    const { data } = await axios.post(
      getBaseUrl(`/api/applicant/user/${userId}`),
      insertData
    );
    return data;
  } catch (err: any) {
    console.error(err);
  }
};

/* 스터디 승인 또는 거절 */
export const patchApproveOrRejectApplicantApi = async (
  userId: string,
  studyId: string,
  recognition: "승인" | "거절"
) => {
  console.log({ recognition, studyId });
  try {
    const { data } = await axios.patch(
      getBaseUrl(`/api/applicant/user/${userId}`),
      { studyId, recognition }
    );
    return data;
  } catch (err: any) {
    console.error(err);
  }
};

/* 신청 취소 */
export const deleteRejectApplicantApi = async (userId: string) => {
  try {
    const { data } = await axios.delete(
      getBaseUrl(`/api/applicant/user/${userId}`)
    );
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
