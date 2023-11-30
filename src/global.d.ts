import { Mongoose } from "mongoose";

/* eslint-disable no-var */
declare global {
  /**
   * Next가 재시작할때마다 디비 연결을 시도하지 말고
   * global에 캐싱해서 한번만 연결.
   */
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}