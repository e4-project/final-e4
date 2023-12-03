import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import Message from "@/models/message";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const data = await Message.findOne();;
    console.log(data)
    return NextResponse.json({msg: "hello!"});
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { isOk: false, message: "데이터가 비어있습니다." },
        { status: 404 }
      );
    }
    // console.log(user);
    const saveData = await Message.create({ name, email, message });
    return NextResponse.json(saveData);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
