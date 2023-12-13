import { NextResponse, NextRequest } from "next/server";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import mongoose from "mongoose";
import User from "@/models/user";
import RecruitComment from "@/models/recruit_comment";

export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
        const comment = await RecruitComment.find({})
          .where({ studyId: params.id })
          .populate('user', 'name image')
          .sort({ createdAt: -1 });
        return NextResponse.json(comment);
  }
);

export const POST = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const studyId = params.id;
    const { user: uData, content } = await req.json();
    if (!content) {
      return NextResponse.json(
        { message: "데이터가 비어있습니다." },
        { status: 404 }
      );
    }

    const user = await User.findOne({ name: uData.name });
    const comment = await RecruitComment.create({
      user: user._id,
      studyId,
      content,
    });
    return NextResponse.json(comment);
  }
);
