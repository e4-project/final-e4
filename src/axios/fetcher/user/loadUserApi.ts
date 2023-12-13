import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";

export const loadUserApi = async () => {
  const {data} = await axios.get(
    getBaseUrl("/api/user")
  );
  return data;
};
