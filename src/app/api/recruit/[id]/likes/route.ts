import { NextResponse, NextRequest } from "next/server";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import RecruitLike from "@/models/recruit_like";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import User from "@/models/user";
import RecruitPost from "@/models/recruit_post";

/* 
  path: /api/recruit/[id]/likes
*/
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const recruitId = params.id;
    const likes = await RecruitLike.find({})
      .where({ recruitId })
      .select("userId recruitId")
      .sort({ createdAt: -1 });
    const recruitLikes = { likes, count: likes.length };
    return NextResponse.json(recruitLikes);
  }
);

/* 
   좋아요 api (23.12.17)
    - 좋아요 동작 프로세스는 간단하다.
     - 유저가 좋아요를 누르면 userId, studyId를 저장, 화면에는 좋아요 표시 
     - 유저가 좋아요를 다시 누르면 userId, studyId를 삭제, 화면에는 좋아요 비활성 표시
    - 반복 요청 방지를 위해 프론트엔드에서 처리  
*/
export const POST = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const recruitId = params.id;
    const { userId } = await req.json();
    let session = await getServerSession(authOptions);
    if (session && userId) {
      await RecruitLike.create({
        userId,
        recruitId,
        user: userId,
        recruit: recruitId,
      });
      return NextResponse.json("좋아요를 추가했습니다.");
    }
    return NextResponse.json("like");
  }
);

export const DELETE = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id: recruitId } = params;

    let session = await getServerSession(authOptions);
    if (!recruitId) {
      return NextResponse.json(
        { message: "경로가 올바르지 않습니다." },
        { status: 404 }
      );
    }

    if (session) {
      const user = await User.findOne({ email: session.user?.email });
      // user.name 보다는 email이 좀 더 unique해서 사용하게됨
      const result = await RecruitLike.find()
        .where("user")
        .equals(user._id)
        .deleteOne({ recruitId });
      return NextResponse.json("좋아요를 취소했습니다.");
    }
  }
);
