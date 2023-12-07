import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import connectDB from "@/config/db/connectDB";
import User from "@/models/user";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await UPDATE(req.body);
  res.status(200).json(result);
};

const UPDATE = async (data: any) => {
  let session = await getServerSession(authOptions);
  await connectDB();
  if (session) {
    data.email = session?.user?.email;
    try {
      console.log("imageUrl:", data.imageUrl);
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