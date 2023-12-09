import StudyPost from "@/models/study_post";
import User from "@/models/user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = routeWrapperWithError(async () => {
  const studyPost = await StudyPost.find({}).sort({ createdAt: -1 }).populate('user', '_id name image')
  return NextResponse.json(studyPost);
});

export const POST = routeWrapperWithError(async (req: NextRequest) => {
  let session = await getServerSession(authOptions);
  const { content } = await req.json();

  if (session) {
    if (!content) {
      return NextResponse.json(
        { isOk: false, message: "데이터가 비어있습니다." },
        { status: 404 }
      );
    }
    const user = await User.findOne({ name: session.user?.name });
    const savedData = await StudyPost.create({ content, user: user._id });
    return NextResponse.json(savedData);
  }
});

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
