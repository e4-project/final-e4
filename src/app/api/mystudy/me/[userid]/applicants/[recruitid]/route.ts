import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";

/* 
   path: /api/mystudy/me/:id/applicants/:recruitid
   - 내 모집글 참여 신청 현황(신청자 확인 버튼 누르면 나오는 페이지) 모두 가져오기
*/
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string, recruitid: string } }) => {
    const userName = params.id;
    const recruitid = params.recruitid;
    console.log(userName, recruitid)
    return NextResponse.json(userName);
  }
);