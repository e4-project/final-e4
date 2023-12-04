import connectDB from "@/config/db/connectDB";
import StudyPost from "@/models/study_post";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const studyPost = await StudyPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json(studyPost);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { contents } = await req.json();
    if (!contents) {
      return NextResponse.json(
        { isOk: false, message: "데이터가 비어있습니다." },
        { status: 404 }
      );
    }
    const savedData = await StudyPost.create({ contents });
    return NextResponse.json(savedData);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
