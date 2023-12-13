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

        const { material, duration, applicants, leader, materialUrl } = userRecruitPost;

        const studyMember = applicants.map((member: any, index: any) => {
            const memberId = member[0].toString();
            return {memberId}
        });
        console.log(studyMember);
        if(studyMember ){
            console.log(studyMember);
        }

        console.log(userRecruitPost);
        console.log({ material, duration, applicants, leader, materialUrl });

        return NextResponse.json({ material, duration, applicants, leader, materialUrl });
    } catch (error) {
        console.error('데이터 로딩 중 에러', error);
        return NextResponse.json({ isOk: false, message: '데이터 로딩 중 에러' }, { status: 500 });
    }
});