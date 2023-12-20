import { getServerSession } from "next-auth";
import StudyPost from "@/models/study_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import User from "@/models/user";

/* 
   path: /api/study/:studyid/board
*/

export const DELETE = routeWrapperWithError(
  async (
    req: NextRequest,
    { params }: { params: { studyid: string; postid: string } }
  ) => {
    const session = await getServerSession(authOptions);
    const studyId = params.studyid;
    const postId = params.postid;
    console.log({studyId, postId})
    if (!studyId || !postId) {
      return NextResponse.json(
        { isOk: false, message: "경로가 잘못되었습니다." },
        { status: 404 }
      );
    }

    if (session) {
      const user = await User.findOne({ name: session?.user?.name });
      const userId = user._id;
      const userStudyPost = await StudyPost.findById(postId)
        .where("user")
        .equals(userId);
        console.log({userStudyPost})
      if (!userStudyPost) {
        return NextResponse.json(
          {
            msg: "자신이 작성한 게시글만 삭제할 수 있습니다.",
          },
          { status: 403 }
        );
      }
      userStudyPost.deleteOne({
        _id: postId,
      });
      return NextResponse.json({ msg: "삭제 완료" });
    }
  }
);
