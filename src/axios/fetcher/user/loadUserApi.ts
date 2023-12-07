import { api } from "@/axios/api";

export const loadUserApi = async () => {
  const {data} = await api.get(
    "/api/user"
  );
  return data;
};
