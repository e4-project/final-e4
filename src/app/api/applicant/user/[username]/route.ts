import connectDB from "@/config/db/connectDB";
import Applicant from "@/models/applicant";
import { NextRequest, NextResponse } from "next/server";

// api/applicant/user/username
//    /board/:id/comment
//내 모집글에 참여한 신청자 목록
//author === userId
export const GET = async (
  req: NextRequest,
  { params }: { params: { username: string } }
) => {
  const user = params.username;
  console.log({ user });
  try {
    await connectDB();
    const applicantList = await Applicant.find().where({author: user});
    console.log(applicantList);
    return NextResponse.json(applicantList);
  } catch (error) {
    return NextResponse.json({ msg: "error message!" }, { status: 500 });
  }
};
