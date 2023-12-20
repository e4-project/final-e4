import { NextResponse } from "next/server";
import connectDB from "@/config/db/connectDB";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import StudyNote from "@/models/study_note";
import User from "@/models/user";
import { useSearchParams } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
interface NextRequest {
  // 기존 속성들...
  url: string;
  query: {
    [key: string]: string | Array<string> | undefined;
  };
  json: () => Promise<any>;
}
export const GET = routeWrapperWithError(
  async (
    req: NextRequest,
    { params }: { params: { id: string; week: string } }
  ) => {
    await connectDB();
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const week = searchParams.get("week");
    console.log(week);

    console.log(params.id);
    // 유저 정보 가져오기
    const user = await User.findOne();
    
    console.log({ user });

    try {
      // id와 주차 정보와 관련된 노트 찾고
      const studyNote = await StudyNote.findOne({
        author: params.id,
        week: week,
      });
      console.log({ studyNote });

      if (studyNote) {
        // 찾은 노트의 contents 가져옴
        return NextResponse.json({
          memberId: studyNote.author,
          contents: studyNote.contents,
          week: studyNote.week,
        });
      } else {
        return NextResponse.json(
          { error: "해당 노트 내용 없음" },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error("조회 오류", error);
      return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
  }
);
export const POST = routeWrapperWithError(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    try {
      await connectDB();
      const user = await User.findOne({ email: session?.user?.email });

      const { week, contents } = data;

      const studyId = params.id;

      const newNote = new StudyNote({
        author: user._id,
        studyId: studyId,
        week: week,
        contents: contents,
      });

      // console.log({ newNote });
      const savedNote = await newNote.save();

      return NextResponse.json({ success: true, note: savedNote });
    } catch (error) {
      console.error("저장 오류", error);
      return NextResponse.json(
        { success: false, error: "서버 오류" },
        { status: 500 }
      );
    }
  }
);