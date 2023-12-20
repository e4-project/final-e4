import Member from "@/models/member";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

/* 
   path: /api/mystudy/me/:id/applicants/:recruitid
   - 현재 스터디의 멤버
*/
export const GET = routeWrapperWithError(
  async (
    req: NextRequest,
    { params }: { params: { userid: string; recruitid: string } }
  ) => {
    const userId = params.userid;
    const recruitid = params.recruitid;
    //로그인한 경우에만 조회
    const members = await Member.find()
      .where({ studyId: recruitid })
      .populate("member", "name image");
      return NextResponse.json(members);
  }
);
