import Applicant from "@/models/applicant";
import RecruitPost from "@/models/recruit_post";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/* 
   path: /api/applicant/me/userId/studyname/recruitId
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

// 내가 신청한 스터디 취소
export const DELETE = routeWrapperWithError(
  async (
    req: NextRequest,
    { params }: { params: { id: string; recruitid: string } }
  ) => {
    console.log("스터디 취소");
    const session = await getServerSession(authOptions);
    const userId = params.id;
    const recuitId = params.recruitid;
    if (session) {
      const myApplicant = await Applicant.findOne({ studyId: recuitId }).where({
        applicant: userId,
      });
      await Applicant.deleteOne({ _id: myApplicant._id });
      await RecruitPost.updateOne(
        { _id: recuitId },
        { $pull: { applicants: userId } }
      );
      return NextResponse.json("스터디 취소 완료");
    }
  }
);
