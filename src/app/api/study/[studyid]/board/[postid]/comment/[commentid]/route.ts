import StudyPostComment from "@/models/study_post_comment";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";

/* 
  path: /api/study/:studyid/board/:postid/comment/commentid
*/
export const DELETE = routeWrapperWithError(
  async (
    req: NextRequest,
    {
      params,
    }: { params: { studyid: string; postid: string; commentid: string } }
  ) => {
    const { studyid: studyId, postid: postId, commentid: commentId } = params;
    console.log({studyId, postId, commentId})
    if (!studyId || !postId || !commentId) {
      return NextResponse.json(
        { message: "경로가 올바르지 않습니다." },
        { status: 404 }
      );
    }

    await StudyPostComment.deleteOne({ _id: commentId });
    return NextResponse.json("삭제되었습니다.");
  }
);

export const PATCH = routeWrapperWithError(
  // 구현중
  async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const commentId = params.slug;
    const comment = await StudyPostComment.updateOne({ _id: commentId });
    return NextResponse.json(comment);
  }
);
