import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import RecruitPost from "@/models/recruit_post";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import StudyNote from "@/models/study_note";
import User from "@/models/user";

export const GET = routeWrapperWithError(async (req:NextRequest, {params}: {params: {id: string}}) => {
    await connectDB();

    const userId = await User.find();
    const studyId = params.id;
});

export const POST = routeWrapperWithError(async (req:NextRequest, {params}: {params: {id: string}}) => {
    const data = await req.json();
});