import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";

/* 
  모집글 상세 정보
  params: id | studyname
*/

/* 
  path: /api/recruit/id/:id 
*/
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { slug: string } }) => {
    if (params.slug[0] === "id") {
      //slug === id인경우
      const studyId = params.slug[1];
      const ObjectId = mongoose.Types.ObjectId;
      const recuitsId = new ObjectId(studyId);
      const recuitsPost = await RecruitPost.findById(recuitsId).populate(
        "leader",
        "name image"
        
      );
      return NextResponse.json(recuitsPost);
    } else {
      //slug === studyname인경우
      const studyName = params.slug[1];
      const recuitsPost = await RecruitPost.findOne({ studyName }).sort({
        createdAt: -1,
      });
      return NextResponse.json(recuitsPost);
    }
  }
);
