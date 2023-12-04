import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    let session = await getServerSession(authOptions);
    if (session) {
      console.log(session);
      res.status(200).json({ session });
    } else {
      res.status(200).json({ session: "No session" });
    }
  } catch (error) {
    console.error("Error getting session:", error);
  }
}
