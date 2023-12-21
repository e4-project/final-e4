import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const updateStudyRoomUrl = async (studyId: string, url: string) => {
  console.log({studyId})
 try {
  const { data } = await axios.patch(getBaseUrl(`/api/recruits/id/${studyId}`), {studyRoomUrl: url});
  return data;
 } catch(err: any) {
  console.error(err)
 }
};