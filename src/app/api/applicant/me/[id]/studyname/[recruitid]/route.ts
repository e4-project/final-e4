import Applicant from "@/models/applicant";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";

/* 
   path: /api/applicant/me/657968bdd2d684ad75a2a616/studyname/6576feeeea262d2cf9fd9a8d
*/
// 내 모집글의 참여 신청자 목록
export const GET = routeWrapperWithError(
  async (
    req: NextRequest,
    { params }: { params: { id: string; recruitid: string } }
  ) => {
    const userId = params.id;
    const studyId = params.recruitid;
    console.log({ studyId });
    const applicant = await Applicant.find({ studyId })
      .select({
        //특정 필드(updatedAt) 제외
        updatedAt: 0,
      })
      .populate("applicant", "name")
      .populate("studyId", "studyName")
      .where({recognition: {$regex : '대기'}});
    /*  Applicant에서 recognition: "대기" 상태인 
    참여 신청자 목록 가져오기 
*/
    return NextResponse.json(applicant);
  }
);
