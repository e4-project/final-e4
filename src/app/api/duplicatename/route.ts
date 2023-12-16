import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/db/connectDB";
import { routeWrapperWithError } from "@/utils/routeWrapperWithError";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const GET = routeWrapperWithError(async (req: NextRequest) => {
  await connectDB();
  const session = await getServerSession(authOptions);

  const user = await User.findOne({ email: session?.user?.email });
  if (!user) {
    throw new Error("User not found");
  }
  const userId = user._id;
  console.log(userId);
  const changename = await User.findById(userId);
  console.log(changename);
  if (!changename) {
    throw new Error("User not found");
  }

  return NextResponse.json({
    changename: changename,
  });
});
