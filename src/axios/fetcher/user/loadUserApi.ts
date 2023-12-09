// import { api } from "@/axios/api";
import axios from "axios";

export const loadUserApi = async () => {
  const {data} = await axios.get(
    "/api/user"
  );
  return data;
};
