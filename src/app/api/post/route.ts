import { NextResponse, NextRequest } from "next/server";
import Post from "@/models/post";
import connectDB from "@/config/db/connectDB";
import StudyPost from "@/models/study_post";

const withErrorHandling =
  (fn: (data: any) => Promise<NextResponse>) => async (req: NextRequest) => {
    try {
      const data = await req.json();

      if (
        !data.item_name ||
        !data.page_link ||
        !data.study_topic ||
        !data.study_duration ||
        !data.study_capacity ||
        !data.study_deadline ||
        !data.study_name
      ) {
        return NextResponse.json({ msg: "Invalid data" }, { status: 400 });
      }

      return await fn(data);
    } catch (error) {
      return NextResponse.json({ msg: "error message!" }, { status: 500 });
    }
  };

export const POST = withErrorHandling(async (data) => {
  // 데이터베이스에 연결. 연결 된 상태면 연결된걸로 진행.
  await connectDB();

  // 데이터를 데이터베이스에 저장
  const post = new Post(data);
  const result = await post.save();

  return NextResponse.json(result);
});

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const post = await Post.find({});
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
