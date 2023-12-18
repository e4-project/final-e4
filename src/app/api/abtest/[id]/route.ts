import Member from "@/models/member";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import User from "@/models/user";
import RecruitPost from "@/models/recruit_post";

/* 
   api 테스트용
   path: /api/mystudy/me/:id/applicants/:recruitid
   - 현재 스터디의 멤버
*/
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const recruitpost = await RecruitPost.findById(params.id);
    console.log(Number(recruitpost.headCount));
    return NextResponse.json({
      recruitpostHeadcount: Number(recruitpost.headCount),
      applicantCount: Number(recruitpost.applicants.length)
    });
  }
);
