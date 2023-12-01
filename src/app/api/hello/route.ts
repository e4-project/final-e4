import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import Post from "@/models/post";
/**
 * /api/hello으로 api 접근 가능
 * 아래는 사용하는 방법이며 얼마든지 수정가능.
 * 함수는 http method(대문자)명으로 생성.
 * */

export const GET = async (req: NextRequest) => {
  try {
    return NextResponse.json({ msg: "Hello Word!" });
  } catch (error) {
    return NextResponse.json({ msg: "error message!" }, { status: 500 });
  }
};

if (process.env.DB_URI) {
  mongoose.connect(process.env.DB_URI);
} else {
  console.error("DB_URI is not defined");
}

export const POST = async (req: NextRequest) => {
  try {
    // 클라이언트로부터 받은 데이터를 파싱합니다.
    const data = await req.json();

    // 이 데이터를 사용하여 Post 모델의 인스턴스를 생성합니다.
    const post = new Post(data);

    // 이 인스턴스를 데이터베이스에 저장합니다.
    const result = await post.save();

    // 저장된 데이터를 반환합니다.
    return NextResponse.json(result);
  } catch (error) {
    // 오류가 발생하면, 오류 메시지와 함께 500 상태 코드를 반환합니다.
    return NextResponse.json({ msg: "error message!" }, { status: 500 });
  }
};
