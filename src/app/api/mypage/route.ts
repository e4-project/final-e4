import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/db/connectDB";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";
import Attendance from "@/models/attendance";
import User from "@/models/user";

export const POST = routeWrapperWithError(async (req: NextRequest) => {
  const data = await req.json();
  console.log(data);

  // Attendance 모델에 새로운 출석체크 이벤트를 추가
  const attendance = new Attendance({
    user: data.userId,
    checkInTime: new Date(data.checkInTime),
  });
  await attendance.save();

  // User 모델의 lastCheckInDate 필드를 업데이트
  const user = await User.findOne({ email: data.userId });
  if (user) {
    user.lastCheckInDate = new Date(data.checkInTime);
    await user.save();
  }

  // 요청 처리가 완료되면 응답을 반환
  return NextResponse.json({ message: "Data received successfully" });
});
