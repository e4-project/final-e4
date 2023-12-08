import { IResponseUser } from "./user";

export interface IResponseBoard {
  _id: string;
  user: IResponseUser;
  views?: number;
  content: string;
  createdAt: string;
}