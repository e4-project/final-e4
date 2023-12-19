import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const loadMemberApi = async (studyId: string) => {
  try {
    const { data } = await axios.get(getBaseUrl(`/api/member/studyname/${studyId}`));
    console.log({res: data})
    return data;
  } catch (err: any) {
    console.error(err);
  }
};
