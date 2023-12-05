import connectDB from "@/config/db/connectDB";
import { NextRequest, NextResponse } from "next/server";

/**
 * @name routeWrapperWithError
 * @author 이동현
 * @desc 에러 처리 포함한 route 래퍼함수
 * @param fn(cb)
 */
export function routeWrapperWithError(
  fn: any
) {
  return async (req: NextRequest, {...prop}) => {
    await connectDB();
    return await fn(req, prop).catch((error: any) =>
      NextResponse.json({ message: error.message }, { status: 500 })
    );
  };
}