import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import User from "@/models/user";
import Member from "@/models/member";

export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();

    try {
      const userRecruitPost = await RecruitPost.findOne({ _id: params.id })
        .populate("applicants", "name image")
        .populate("leader", "name image");

      if (!userRecruitPost) {
        return NextResponse.json(
          { isOk: false, message: "유저 데이터 없음." },
          { status: 404 }
        );
      }

      const { material, applicants, duration, leader, materialUrl, weekGoal } =
        userRecruitPost;
      console.log({userRecruitPost});

      // applicants에 있는 id값이 string 이니까 그걸로 User에서 같은 걸 찾게한 다음 name을 가져오게함.
      // const applicants = applicants.map((id: any) => new Object(id)).populate("applicants", "name, image");

      return NextResponse.json({
        material,
        duration,
        applicants,
        leader,
        materialUrl,
        weekGoal,
        // studyNoteContents,
      });
    } catch (error) {
      console.error("데이터 로딩 중 에러", error);
      return NextResponse.json(
        { isOk: false, message: "데이터 로딩 중 에러" },
        { status: 500 }
      );
    }
  }
);
