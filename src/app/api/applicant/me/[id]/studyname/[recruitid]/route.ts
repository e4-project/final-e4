import Applicant from "@/models/applicant";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";

/* 
   path: /api/applicant/me/657a607e7e7ea1a02e16d1d2/studyname/6576be71a0446e9507fc64dd
*/
// 내 모집글의 참여 신청자 목록
export const GET = routeWrapperWithError(
  async (
    req: NextRequest,
    { params }: { params: { id: string; recruitid: string } }
  ) => {
    const studyId = params.recruitid;
    const recruit = await RecruitPost.findById(studyId).select({
      //특정 필드(updatedAt) 제외
      updatedAt: 0,
      weekGoal: 0,
      applicants: 0,
      content: 0,
      materialUrl: 0,
    });
    const applicant = await Applicant.find({ studyId })
      .select({
        updatedAt: 0,
      })
      .populate("applicant", "name image");
    /*  Applicant에서 recognition: "대기" 상태인 
    참여 신청자 목록 가져오기 
*/
    //확인용
    // console.log({recruit: await RecruitPost.findById(studyId)})

    let data = { ...recruit._doc, applicants: [...applicant] };
    return NextResponse.json(data);
  }
);
