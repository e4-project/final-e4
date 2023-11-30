
import { api } from "./axios";
import { IRecruit } from '@/models/recruit';

export const getRecruitApi = async () => {
  const res = await api.get<IRecruit[]>("http://localhost:3000/api/recruit");
  return res;
};