import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let session = await getServerSession(authOptions);
  if (session) {
    console.log(session);
    NextResponse.json({ session });
  } else {
    NextResponse.json({ session: "No session" });
  }
}
