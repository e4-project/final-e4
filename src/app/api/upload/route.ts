import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import User from "@/models/user";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";

export const POST = routeWrapperWithError(async (req: NextRequest) => {
  const formData = await req.formData();
  const data = JSON.parse(formData.get("data") as string);
  const name = data.name;
  const email = data.email;
  const url = data.imgSrc.url;
  console.log(name, email, url);

  await connectDB();

  // data.email과 일치하는 사용자를 찾아서 이름과 이미지 URL을 업데이트
  const user = await User.findOneAndUpdate(
    { email: data.email },
    { name: name, image: url },
    { new: true } // 이 옵션은 업데이트된 문서를 반환
  );

  if (user) {
    console.log(
      "이메일이 일치하는 사용자를 찾아서 이름과 이미지 URL을 업데이트했습니다:",
      user
    );
    // 업데이트된 사용자 정보를 클라이언트에게 반환
    return NextResponse.json(user);
  } else {
    console.log("이메일이 일치하는 사용자를 찾지 못했습니다.");
  }
});
