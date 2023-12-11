import { NextResponse, NextRequest } from "next/server";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import mongoose from "mongoose";

/* 모집글 모아보기 */
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { studyname: string } }) => {
    const ObjectId = mongoose.Types.ObjectId;
    const studyName = new ObjectId(params.studyname);
    console.log({api_studyname: studyName})
    const post = await RecruitPost.findById(studyName).sort({ createdAt: -1 });
    return NextResponse.json(post);
  }
);
