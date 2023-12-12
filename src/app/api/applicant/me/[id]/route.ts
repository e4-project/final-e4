import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";

/* 
   path: /api/applicant/me/:id/
   - (내가) 참여 신청한 스터디: :findOne
    → applicants model에서 member(userid)로 찾기. 
*/
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const userName = params.id;
    return NextResponse.json(userName);
  }
);