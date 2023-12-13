import { NextResponse, NextRequest } from "next/server";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import connectDB from "@/config/db/connectDB";
import User from "@/models/user";

export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const session = await getServerSession(authOptions);

    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      throw new Error("User not found");
    }
    const userId = user._id;

    const recruitPost = await RecruitPost.findById(params.id);
    if (!recruitPost) {
      throw new Error("RecruitPost not found");
    }

    // console.log(recruitPost.weekGoal); // weekGoal 필드를 콘솔에 출력

    return NextResponse.json({
      weekGoal: recruitPost.weekGoal,
      result: recruitPost,
      userId: userId,
    });
  }
);
