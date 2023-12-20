import { NextRequest, NextResponse } from "next/server";

import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import Member from "@/models/member";

// path: /api/member/studyname/:recruitid
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { recruitid: string } }) => {
    const studyId = params.recruitid;
    const memberLeader = await Member.findOne({ studyId }).where({
      rel: "leader",
    }).populate("member", "name image");
    const memberCommon = await Member.find({ studyId }).where({
      rel: "common",
    }).populate("member", "name image");

    return NextResponse.json({ memberLeader, memberCommon });
  }
);
