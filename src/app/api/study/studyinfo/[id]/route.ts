import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";

export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();

    const userRecruitPost = await RecruitPost.findOne({ _id: params.id });

    if (!userRecruitPost) {
      return NextResponse.json(
        { isOk: false, message: "유저 데이터 없음." },
        { status: 404 }
      );
    }

    const userRecruitPostResult = userRecruitPost;

    console.log(userRecruitPostResult);
    return NextResponse.json(userRecruitPostResult);
  }
);
