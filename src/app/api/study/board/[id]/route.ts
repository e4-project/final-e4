import connectDB from "@/config/db/connectDB";
import StudyPost from "@/models/study_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { isOk: false, message: "데이터가 비어있습니다." },
        { status: 404 }
      );
    }
    await StudyPost.deleteOne({_id: id});
    return NextResponse.json({ msg: "삭제 완료" });
  }
);
