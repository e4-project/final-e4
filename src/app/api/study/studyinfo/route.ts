import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import studyInfo from "@/models/recruit_post";

export const GET = async (req: NextRequest) => {
    try {
        await connectDB();
        const data = await studyInfo.find();;
        console.log(data)
        return NextResponse.json({data});
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
    }
    };

    export const POST = async (req: NextRequest) => {
    try {
        await connectDB();
        const { duration, material} = await req.json();

        if (!duration || !material) {
        return NextResponse.json(
            { isOk: false, message: "데이터가 비어있습니다." },
            { status: 404 }
        );
        }

        // console.log(user);
        const saveData = await studyInfo.create({ duration, material });
        return NextResponse.json(saveData);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
};