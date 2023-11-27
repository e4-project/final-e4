import { api } from "../api";

export const getHello = async () => {
  try {
    const res = await api.get<{msg: string}>("/hello");
    return res;
  } catch (err: any) {
    throw new Error(err);
  }
};