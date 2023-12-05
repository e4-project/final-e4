import { NextResponse, NextRequest } from "next/server";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";

/* 모집글 모아보기 */
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { studyname: string } }) => {
    const studyName = params.studyname;
    const post = await RecruitPost.findOne({ studyName });
    console.log({post})
    return NextResponse.json(post);
  }
);
