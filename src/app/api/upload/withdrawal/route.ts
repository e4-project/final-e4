import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import User from "@/models/user";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";

export const DELETE = routeWrapperWithError(async (req: NextRequest) => {
  try {
    const data = await req.json();
    const email = data.email;

    await connectDB();

    // data.email과 일치하는 사용자를 찾아서 회원 탈퇴
    const user = await User.findOneAndDelete({ email: email });

    if (user) {
      console.log(
        "이메일이 일치하는 사용자를 찾아서 회원 탈퇴를 진행했습니다:",
        user
      );
      // 삭제된 사용자 정보를 클라이언트에게 반환
      return NextResponse.json(user);
    } else {
      console.log("이메일이 일치하는 사용자를 찾지 못했습니다.");
    }
  } catch (error) {
    console.error("회원 탈퇴 처리 중 오류가 발생했습니다:", error);
    throw error;
  }
});
