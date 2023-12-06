import { NextResponse, NextRequest } from "next/server";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";

/* 모집글 모아보기 */
export const GET = routeWrapperWithError(async (req: NextRequest) => {
    const post = await RecruitPost.find({});
    return NextResponse.json(post);
});

export const POST = routeWrapperWithError(async (req: NextRequest) => {
  const data = await req.json();
  if (
    !data.material ||
    !data.materialUrl ||
    !data.applicants ||
    !data.materialType ||
    !data.leader ||
    !data.studyKeyword ||
    !data.duration ||
    !data.headCount ||
    !data.deadLine ||
    !data.studyName ||
    !data.content
  ) {
    return NextResponse.json({ msg: "Invalid data" }, { status: 400 });
  }
  const result = await RecruitPost.create(data);
  return NextResponse.json(result);
});