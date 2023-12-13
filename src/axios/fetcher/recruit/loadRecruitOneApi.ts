import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const loadRecruitOneByIdApi = async (id: string) => {
  try {
    //내가 만든 스터디 leader _id으로 찾기
    const {data} = await axios.get(
      getBaseUrl(`/api/recruits/id/${id}`)
    );
    return data;
  } catch(error: any) {
    console.error(error.response)
  }
};

// export const loadRecruitOneByNameApi = async (studyName: string) => {
//   try {
//     //내가 만든 스터디 이름으로 찾기
//     const {data} = await axios.get(
//       getBaseUrl(`/api/recruits/studyname/${studyName}`)
//     );
//     return data;
//   } catch(error: any) {
//     console.error(error.response)
//   }
// };