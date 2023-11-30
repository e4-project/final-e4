
import { api } from '@/axios/api';
import { IRecruit } from '@/interfaces/recruit';

export const getRecruitApi = async () => {
  const res = await api.get<IRecruit[]>("http://localhost:3000/api/recruit");
  return res;
};