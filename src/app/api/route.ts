import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import Message from "@/models/message";

export const GET = async (req: NextRequest) => {
  try {
    const msg = await Message.find({})
    return NextResponse.json(msg);
  } catch (error) {
    return NextResponse.json({ msg: "Hello Word!" }, { status: 500 });
  } finally {
    connectDB();
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, message } = await req.json();
    console.log(!name, !email, !message);
    if (!name || !email || !message) {
      return NextResponse.json(
        { isOk: false, message: "데이터가 비어있습니다." },
        { status: 404 }
      );
    }
    // console.log(user);
    const saveData = await Message.create({ name, email, message });
    return NextResponse.json({ isOk: true, saveData });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    connectDB();
  }
};
