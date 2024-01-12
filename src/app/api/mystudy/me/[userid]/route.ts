import { NextResponse, NextRequest } from "next/server";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import RecruitPost from "@/models/recruit_post";
import LikedRecruitPost from "@/models/recruit_like";

/* 
   내스터디 정보
   path: /api/mystudy/me/:userid
    - 내가 만든 스터디(모집글)
     → RecruitPost model에서 leader로 확인
    - 참여 중인 스터디(내가 leader, member인 스터디)
     → member model(leader, memeber rel로 구분)에서 (userid)로 찾아서 studyId로 조건
    - 좋아요한 모집글
     → likes model에서 recruitPostId로 확인
*/
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { userid: string } }) => {
    console.log("실행");
    const userId = params.userid;
    const createdMyStudy = await RecruitPost.find(
      { leader: userId },
      { studyName: 1, leader: 1, start: 1 }
    ); 
    //내가 만든 스터디
    const mySutdyData = { createdMyStudy };
    //내가 좋아요한 스터디
    const myLikedStudy = await LikedRecruitPost.find({ userId }); // 좋아요한 스터디
    console.log({myLike: myLikedStudy})
    return NextResponse.json(mySutdyData);
  }
);
