import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/config/db/connectDB";
import Applicant from "@/models/applicant";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { author, applicant, recruitPostId, message } = await req.json();
    if (!author || !applicant || !recruitPostId || !message) {
      return NextResponse.json(
        { isOk: false, message: "데이터가 비어있습니다." },
        { status: 404 }
      );
    }
    const savedData = Applicant.create({
      author,
      applicant,
      recruitPostId,
      message,
    });
    return NextResponse.json(savedData);
  } catch (error) {
    return NextResponse.json({ msg: "error message!" }, { status: 500 });
  }
};
