import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

interface IApplicantRequest {
  userId: string;
  message: string;
  studyId: string;
}

export const postApplicantApi = async (reqData: IApplicantRequest) => {
  console.log({reqData})
  const {userId, ...insertData} = reqData;
  try {
    const { data } = await axios.post(getBaseUrl(`/api/applicant/user/${userId}`), insertData);
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
