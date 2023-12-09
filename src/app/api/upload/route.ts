import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import connectDB from "@/config/db/connectDB";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const result = await UPDATE(req.body);
  NextResponse.json(result);
};

const UPDATE = async (data: any) => {
  let session = await getServerSession(authOptions);
  await connectDB();
  if (session) {
    data.email = session?.user?.email;
    try {
      await User.findOneAndUpdate(
        { email: data.email },
        { image: data.imageUrl },
        { new: true }
      );
      return { message: "Update successful" };
    } catch (error) {
      console.error(error);
      return { error: "Update failed" };
    }
  } else {
    return { error: "No session found" };
  }
};
