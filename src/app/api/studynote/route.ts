import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import RecruitPost from "@/models/recruit_post";

export const POST = routeWrapperWithError(async (req: NextRequest) => {
  const data = (await req.json()) as { id: string; weekGoal: any[] };
  const id = data.id;
  const weekGoal = data.weekGoal;

  await connectDB();

  // weekGoal 데이터를 { week: '1주차', goal: '123' } 형태로 변환
  const weekGoalTransformed = weekGoal.map((goal, index) => {
    const week = Object.keys(goal)[0];
    const goalValue = goal[week];
    return { week, content: goalValue }; // 'goal' 대신 'content'를 사용
  });

  const studyNote = await RecruitPost.findOneAndUpdate(
    { _id: id },
    { weekGoal: weekGoalTransformed }, // 변환된 weekGoal 데이터를 weekGoal 필드에 저장
    { new: true }
  );
  if (studyNote) {
    console.log("업데이트했습니다:", studyNote);
    // 업데이트된 사용자 정보를 클라이언트에게 반환
    return NextResponse.json(studyNote);
  } else {
    console.log("찾지 못했습니다.");
  }
});
