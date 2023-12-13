import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import StudyNote from "@/models/study_note";
import User from "@/models/user";
import RecruitPost from "@/models/recruit_post";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    await RecruitPost.find({});
    await User.find({});
    const data = await StudyNote.find({})
      .populate("author", "_id name image")
      .populate("studyId", "_id leader studyKeyword");
    // console.log({user, studyId})

    // console.log({data})
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { author, studyId, week, contents } = await req.json();

    if (!author || !studyId || !week || !contents) {
      return NextResponse.json(
        { isOk: false, message: "데이터가 비어있습니다." },
        { status: 404 }
      );
    }

    // console.log(user);
    const saveData = await StudyNote.create({
      author,
      studyId,
      week,
      contents,
    });
    // console.log(saveData);
    return NextResponse.json(saveData);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
