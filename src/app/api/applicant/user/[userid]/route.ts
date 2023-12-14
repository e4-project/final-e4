import Applicant from "@/models/applicant";
import User from "@/models/user";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";
import Member from "@/models/member";
import RecruitPost from "@/models/recruit_post";

/* 
  path: /api/applicant/user/:userId */
// 모집글 참여 신청
export const POST = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { userid: string } }) => {
    const { studyId, message } = await req.json();
    const userId = params.userid;
    console.log({ userId });
    if (!studyId || !message) {
      return NextResponse.json(
        { isOk: false, message: "데이터가 비어있습니다." },
        { status: 404 }
      );
    }
    const savedApplicant = await Applicant.create({
      applicant: userId,
      studyId,
      message,
    });
    const savedRecruitPost = await RecruitPost.findByIdAndUpdate(studyId, {
      $push: { applicants: userId },
    });
    return NextResponse.json({ ...savedApplicant, savedRecruitPost });
  }
);

//  모집글 참여 신청 승인 상태: "승인" | "거절"
export const PATCH = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { username: string } }) => {
    const { recognition } = await req.json(); // "승인" 또는 "거절"
    const userName = params.username;
    const user = await User.findOne({ name: userName });
    const applicants = await Applicant.findOne({ applicant: user._id });
    applicants.updateOne({
      $set: {
        recognition,
      },
    });
    /* member:UserId, studyId */
    if (recognition === "승인") {
      const insertData = {
        member: applicants.applicant,
        studyId: applicants.studyId,
      };
      const result = await Member.create(insertData);
      console.log({ member: result });
    }
  }
);
