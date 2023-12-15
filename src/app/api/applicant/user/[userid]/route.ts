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
    console.log(savedApplicant._id)
    const savedRecruitPost = await RecruitPost.findByIdAndUpdate(studyId, {
      $push: { applicants: userId },
    });

    return NextResponse.json({ ...savedApplicant, savedRecruitPost });
  }
);

//  모집글 참여 신청 승인 상태: "승인" | "거절"
export const PATCH = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { userid: string } }) => {
    const { recognition } = await req.json(); // "승인" 또는 "거절"
    const userId = params.userid;
    console.log({recognition, userId})
  
    // const user = await User.findOne({ name: userName });
    const applicants = await Applicant.findOne({ applicant: userId });
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
    return NextResponse.json("승인되었을까??");
  }
);
