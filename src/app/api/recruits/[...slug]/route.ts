import { NextResponse, NextRequest } from "next/server";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import mongoose from "mongoose";

/* 
  모집글 상세 정보
  params: id | studyname
*/
export const GET = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { slug: string } }) => {
    console.log({params})
    if (params.slug[0] === "id") {
      console.log(params.slug[1]);
      const studyId = params.slug[1];
      const ObjectId = mongoose.Types.ObjectId;
      const recuitsId = new ObjectId(studyId);
      const recuitsPost = await RecruitPost.findById(recuitsId).sort({ createdAt: -1 });
      return NextResponse.json(recuitsPost);
    } else {
      const studyName = params.slug[1];
      const recuitsPost = await RecruitPost.findOne({studyName}).sort({ createdAt: -1 });
      console.log({recuitsPost});
      return NextResponse.json(recuitsPost);
    }
  }
);
