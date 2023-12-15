import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import User from "@/models/user";

export const POST = routeWrapperWithError(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const data = await req.json();
    console.log({params});
    const { week, contents } = data;

        try {

        const studyNote = await RecruitPost.findOneAndUpdate(
            { _id: params.id, "studyNoteContents.week": week },
            { $set: { "studyNoteContents.$.contents": contents } },
            { new: true }
        );

        if (studyNote) {
            console.log("업데이트했습니다:", studyNote);
            return NextResponse.json(studyNote);
        } else {
            console.log("찾지 못했습니다.");
        }
        } catch (error) {
        console.error("데이터 업데이트 중 에러", error);
        return NextResponse.json({ isOk: false, message: "데이터 업데이트 중 에러" }, { status: 500 });
    }
});