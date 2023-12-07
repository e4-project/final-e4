import connectDB from "@/config/db/connectDB";
import Comment from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

// /api/study/board/:id/comment
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const comment = await Comment.find()
      .where({ studyPostId: params.id })
      .sort({ createdAt: -1 });
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { content, studyPostId } = await req.json();
    if (!content || !studyPostId) {
      return NextResponse.json(
        { isOk: false, message: "데이터가 비어있습니다." },
        { status: 404 }
      );
    }
    const savedData = await Comment.create({ content, studyPostId });
    return NextResponse.json(savedData);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
