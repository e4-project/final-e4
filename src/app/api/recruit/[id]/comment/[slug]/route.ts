import { NextResponse, NextRequest } from "next/server";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import RecruitComment from "@/models/recruit_comment";
import { getServerSession } from "next-auth";

// 수정, 삭제시 유저 인증 검증
export const PATCH = routeWrapperWithError(
  // 구현중
  async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const commentId = params.slug;
    const comment = await RecruitComment.updateOne({_id: commentId});
    return NextResponse.json(comment);
  }
);

export const DELETE = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string, slug: string } }) => {
    const {id: pId, slug: cId} = params;
    if (!pId || !cId) {
      return NextResponse.json(
        { message: "경로가 올바르지 않습니다." },
        { status: 404 }
      );
    }
    
    await RecruitComment.deleteOne({_id: cId});
    return NextResponse.json("삭제되었습니다.");
  }
);
