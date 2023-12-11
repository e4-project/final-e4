// import { api } from "@/axios/api";
import { baseUrl } from "@/constants/url";
import axios from "axios";

export const loadUserApi = async () => {
  const {data} = await axios.get(
    `${baseUrl}/api/user`
  );
  return data;
};
