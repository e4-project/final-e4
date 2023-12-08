import User from "@/models/user";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let session = await getServerSession(authOptions);
  if (session) {
   const username = session.user?.name;
   const data = await User.findOne({name: username})
   return NextResponse.json(data);
  } else {
    return NextResponse.json({ session: "No session" }, {status: 401});
  }
}
