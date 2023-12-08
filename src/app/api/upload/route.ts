import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import connectDB from "@/config/db/connectDB";
import User from "@/models/user";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { Console } from "console";

export const POST = routeWrapperWithError(async (req: NextRequest) => {
  const data = await req.json();
  console.log(data);
  await connectDB();

  // data.email과 일치하는 사용자를 찾아서 이름을 업데이트합니다.
  const user = await User.findOneAndUpdate(
    { email: data.email },
    { name: data.name },
    { new: true } // 이 옵션은 업데이트된 문서를 반환합니다.
  );

  if (user) {
    console.log(
      "이메일이 일치하는 사용자를 찾아서 이름을 업데이트했습니다:",
      user
    );
  } else {
    console.log("이메일이 일치하는 사용자를 찾지 못했습니다.");
  }
});
