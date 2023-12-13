import { NextResponse, NextRequest } from "next/server";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/* 모집글 모아보기 */
export const GET = routeWrapperWithError(async (req: NextRequest) => {
  const post = await RecruitPost.find({});
  return NextResponse.json(post);
});

export const POST = routeWrapperWithError(async (req: NextRequest) => {
  let session = await getServerSession(authOptions);
  const userName = session?.user?.name;
  console.log(userName)
  const data = await req.json();
  if (
    !data.content ||
    !data.deadLine ||
    !data.duration ||
    !data.headCount ||
    !data.material ||
    !data.materialType ||
    !data.materialUrl ||
    !data.studyKeyword ||
    !data.studyName
  ) {
    return NextResponse.json(
      { message: "데이터가 비어있습니다." },
      { status: 404 }
    );
  }
  if (session) {
    console.log(userName)
    const user = await User.findOne({ name: userName });
    const insertData = {
      ...data,
      leader: user._id,
    }
    console.log(insertData);
    const result = await RecruitPost.create(insertData);
    return NextResponse.json(result);
  }
});
