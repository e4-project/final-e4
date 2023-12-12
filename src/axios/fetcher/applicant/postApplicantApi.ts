import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

interface IApplicantRequest {
  userName: string;
  message: string;
  studyId: string;
}

export const postApplicantApi = async (reqData: IApplicantRequest) => {
  const {userName, ...insertData} = reqData;
  console.log({axios: insertData})
  try {
    const { data } = await axios.post(getBaseUrl(`/api/applicant/user/${userName}`), insertData);
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
