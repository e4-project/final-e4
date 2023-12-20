import connectDB from "@/config/db/connectDB";
import StudyPostComment from "@/models/study_post_comment";
import User from "@/models/user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// path: /api/study/:studyid/board/:postid/comment
export const GET = routeWrapperWithError(
  async (
    req: NextRequest,
    { params }: { params: { studyid: string; postid: string } }
  ) => {
    console.log(params.studyid, params.postid);
    const comment = await StudyPostComment.find()
      .where({ studyPostId: params.postid })
      .populate("user", "name image")
      .sort({ createdAt: -1 });
    return NextResponse.json(comment);
  }
);

export const POST = routeWrapperWithError(
  async (
    req: NextRequest,
    { params }: { params: { studyid: string; postid: string } }
  ) => {
    const studyId = params.studyid;
    const postId = params.postid;
    console.log({postId, studyId})
    const { content } = await req.json();
    console.log({ content });
    if (!content) {
      return NextResponse.json(
        { isOk: false, message: "데이터가 비어있습니다." },
        { status: 404 }
      );
    }
    const session = await getServerSession(authOptions);

    if(session) {
      const user = await User.findOne({name: session.user?.name})
      const insertData = {
        user: user._id,
        studyId,
        studyPostId: postId,
        content,
      };
      const savedData = await StudyPostComment.create(insertData);
      return NextResponse.json(savedData);
    }
  }
);
