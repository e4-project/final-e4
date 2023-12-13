import { NextResponse, NextRequest } from "next/server";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import mongoose from "mongoose";
import connectDB from "@/config/db/connectDB";

export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();

    const recruitPost = await RecruitPost.findById(params.id);
    if (!recruitPost) {
      throw new Error("RecruitPost not found");
    }

    console.log(recruitPost.weekGoal); // weekGoal 필드를 콘솔에 출력

    return NextResponse.json({ weekGoal: recruitPost.weekGoal });
  }
);
