import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const loadMystudyOneApi = async (name: string) => {
  try {
    //내가 만든 스터디 leader 이름으로 찾기
    const {data} = await axios.get(
      getBaseUrl(`/api/mystudy/me/${name}`)
    );
    return data;
  } catch(error: any) {
    console.error(error.response)
  }
};
