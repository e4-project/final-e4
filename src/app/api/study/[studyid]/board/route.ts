import { getServerSession } from "next-auth";
import connectDB from "@/config/db/connectDB";
import StudyPost from "@/models/study_post";
import User from "@/models/user";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Member from "@/models/member";

/* 
   path: /api/study/:studyid/board
*/
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { studyid: string } }) => {
    const studyId = params.studyid;
    const studyPost = await StudyPost.find({ studyId })
      .sort({ createdAt: -1 })
      .populate("user", "_id name image");
    return NextResponse.json(studyPost);
  }
);

export const POST = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { studyid: string } }) => {
    const studyId = params.studyid;
    const session = await getServerSession(authOptions);
    const { content } = await req.json();
    if (session) {
      if (!content) {
        return NextResponse.json(
          { isOk: false, message: "데이터가 비어있습니다." },
          { status: 404 }
        );
      }

      const user = await User.findOne({ name: session.user?.name });
      const userId = user._id
      const member = await Member.findOne({studyId}).where({member: userId})
      if(!member) {
        return NextResponse.json("스터디원이 아닙니다.", {status: 403});
      }
      const insertData = {
        user: userId,
        studyId,
        content
      };

      const savedData = await StudyPost.create(insertData);
      return NextResponse.json(savedData);

    }
  }
);

// export const PATCH = async (
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   const id = params.id;
//   try {
//     await connectDB();
//     return NextResponse.json({ msg: "기록" });
//   } catch (error) {
//     return NextResponse.json(error, { status: 500 });
//   }
// };
