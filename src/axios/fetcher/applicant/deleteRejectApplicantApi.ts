import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

/* 
  userId는 applicant가 와야함
*/
export const deleteRejectApplicantApi = async (userId: string) => {
  try {
    const { data } = await axios.delete(
      getBaseUrl(`/api/applicant/user/${userId}`));
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
