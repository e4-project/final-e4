import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import User from "@/models/user";

export const GET = routeWrapperWithError(async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();

    try {
        const userRecruitPost = await RecruitPost.findOne({ _id: params.id });

        if (!userRecruitPost) {
            return NextResponse.json({ isOk: false, message: '유저 데이터 없음.' }, { status: 404 });
        }

        const { material, duration, applicants, leader, materialUrl, weekGoal, studyNoteContents } = userRecruitPost;
        console.log(userRecruitPost);

        // applicants에 있는 id값이 string 이니까 그걸로 User에서 같은 걸 찾게한 다음 name을 가져오게함.
        const applicantObjectIds = applicants.map((id: any) => new Object(id));

        const studyMember = await User.find({ _id: { $in: applicantObjectIds } }, 'name');

        return NextResponse.json({ material, duration, applicants: studyMember, leader, materialUrl, weekGoal, studyNoteContents });
    } catch (error) {
        console.error('데이터 로딩 중 에러', error);
        return NextResponse.json({ isOk: false, message: '데이터 로딩 중 에러' }, { status: 500 });
    }
});

/* export const POST = routeWrapperWithError(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const data = await req.json();
    console.log({data});
    const { week, contents } = data;

        try {
        const studyNote = await RecruitPost.findOneAndUpdate(
            { _id: params.id},
            { studyNoteContents: { contents: {contents}} },
            { new: true }
        );

        console.log({studyNote});
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
}); */
