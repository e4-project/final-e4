import { NextResponse, NextRequest } from "next/server";

/**
 * /api/hello으로 api 접근 가능
 * 아래는 사용하는 방법이며 얼마든지 수정가능.
 * 함수는 http method(대문자)명으로 생성.
 * */
export const GET = async (req: NextRequest) => {
  return NextResponse.json({ msg: "Hello Word!" });
};
