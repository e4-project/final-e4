import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";

/* 
   path: /api/mystudy/me/:id/applicants
   - 내 모집글 참여 신청 현황(신청자 확인 버튼 누르면 나오는 페이지): findAll
    → applicants model에서 내 모집글 정보, 클라이언트측에서 승인한 멤버들(recognition: 승인), 
      스터디 참여 신청자(recognition: 대기) 필터링
*/
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const userName = params.id;
    return NextResponse.json(userName);
  }
);