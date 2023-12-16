import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const patchApproveApplicantApi = async (userId: string, studyId: string, recognition: "승인") => {
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
